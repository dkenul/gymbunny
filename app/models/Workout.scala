package models

import java.util.Date
import javax.inject._

import anorm.SqlParser._
import anorm._
import com.jaroop.anorm.relational._

import play.api.db.DBApi
import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.concurrent.Future

case class Workout (
  id: Option[Long],
  userId: Long,
  onDate: Date,
  description: String,
  workoutExercises: Option[List[WorkoutExercise]]
) {

  def toJson:JsObject = Json.obj(
    "id" -> id,
    "userId" -> userId,
    "onDate" -> onDate,
    "description" -> description,
    "workoutExercises" -> workoutExercises.map { wkes =>
      Json.toJson(wkes.map(_.toJson))
    }
  )
}

object Workout {
  val parser = for {
    id <- get[Option[Long]]("workout.id")
    userId <- long("workout.user_id")
    onDate <- date("workout.on_date")
    description <- str("workout.description")
  } yield Workout(id,userId,onDate,description, None)

  implicit val rf =  RowFlattener[Workout, OneToMany[WorkoutExercise, WorkoutExerciseSet]]{ (workout, workoutExercises) =>
    workout.copy(workoutExercises = Some(OneToMany.flatten(workoutExercises)))
  }

  val relationalParser = RelationalParser(parser, WorkoutExercise.relationalParser)

  implicit val workoutReads: Reads[Workout] = (
    (__ \ "id").readNullable[Long] and
    (__ \ "userId").read[Long] and
    (__ \ "onDate").read[Date] and
    (__ \ "description").read[String] and
    (__ \ "workoutExercises").readNullable[List[WorkoutExercise]]
  )(Workout.apply _)
}

@Singleton
class WorkoutService @Inject()(dbapi: DBApi)(implicit ec: DatabaseExecutionContext) {

  private val db = dbapi.database("default")

  def read (id: Long): Future[Option[Workout]] = Future {
    db.withConnection { implicit connection =>
      SQL"""
        select *
        from workout
        where id = $id
      """
      .as(Workout.parser *)
      .headOption
    }
  }(ec)

  def list (userId: Long): Future[List[Workout]] = Future {
    db.withConnection { implicit c =>
      SQL"""
        select *
        from workout
        where user_id = $userId
      """
      .asRelational(Workout.relationalParser *)
    }
  }(ec)

  // avoid multiple queries for nested data
  def readDetail (id: Long): Future[Option[Workout]] = Future {
    db.withConnection { implicit c =>
      SQL"""
        select *
        from workout
        join workout_exercise on workout.id = workout_exercise.workout_id
        join exercise on workout_exercise.exercise_id = exercise.id
        join workout_exercise_set on workout_exercise_set.workout_exercise_id = workout_exercise.id
        where workout.id = $id
        group by workout_exercise.id, workout_exercise_set.id
      """
      .asRelational(Workout.relationalParser singleOpt)
    }
  }(ec)

  def insert(workout: Workout) = Future {
    val (workoutId, workoutExercises) = db.withConnection { implicit c =>
      val workoutId = SQL(
        """
          insert into workout (user_id, on_date, description)
          values ({user_id}, {on_date}, {description})
        """
      ).on(
        'user_id -> workout.userId,
        'on_date -> workout.onDate,
        'description -> workout.description,
      ).executeInsert()

      // allow optional creation of workoutExercises in the initial post
      val maybeWkes = workout.workoutExercises.map { wkes =>
        wkes.map { wke =>
          wke.copy(
            id = SQL"""
              insert into workout_exercise (workout_id, exercise_id) values(${workoutId}, ${wke.exerciseId})
            """.executeInsert(),
            workoutId = workoutId.get
          )
        }
      }

      (workoutId, maybeWkes)
    }

    workout.copy(
      id = workoutId,
      workoutExercises = workoutExercises
    )
  }(ec)
}
