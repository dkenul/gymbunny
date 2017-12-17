package models

import java.util.Date
import javax.inject._

import anorm.SqlParser._
import anorm._
import com.jaroop.anorm.relational._

import play.api.db.DBApi
import play.api.libs.json._

import scala.concurrent.Future

case class WorkoutExercise (
  id: Option[Long],
  workoutId: Long,
  exerciseId: Long,
  exercise: Option[Exercise],
  workoutExerciseSets: Option[List[WorkoutExerciseSet]]
) {

  def toJson:JsObject = Json.obj(
    "id" -> id,
    "workoutId" -> workoutId,
    "exerciseId" -> exerciseId,
    "exercise" -> exercise.map(_.toJson),
    "sets" -> workoutExerciseSets.map { sets =>
      Json.toJson(sets.map(_.toJson))
    }
  )
}

object WorkoutExercise {
  // val parser = for {
  //   id <- get[Option[Long]]("workout_exercise.id")
  //   workoutId <- long("workout_exercise.workout_id")
  //   exerciseId <- long("workout_exercise.exercise_id")
  // } yield WorkoutExercise(id,workoutId,exerciseId)

  val parser: RowParser[WorkoutExercise] = {
    get[Option[Long]]("workout_exercise.id") ~
    long("workout_exercise.workout_id") ~
    long("workout_exercise.exercise_id") ~
    Exercise.parser.? map {
      case id~wid~eid~exercise => WorkoutExercise(id,wid,eid,exercise, None)
    }
  }

  implicit val rf = RowFlattener[WorkoutExercise, WorkoutExerciseSet]{ (workoutExercise, sets) =>
    workoutExercise.copy(workoutExerciseSets = Some(sets))
  }

  val relationalParser = RelationalParser(parser, WorkoutExerciseSet.parser)
}

@Singleton
class WorkoutExerciseService @Inject()(dbapi: DBApi)(implicit ec: DatabaseExecutionContext) {

  private val db = dbapi.database("default")

  val parser = WorkoutExercise.parser

  def list:Future[List[WorkoutExercise]] = Future {
    db.withConnection { implicit c =>
      SQL(
        """
          select *
          from workout_exercise
        """
      ).as(parser *)
    }
  }(ec)

  def list (workoutId: Long): Future[List[WorkoutExercise]] = Future {
    db.withConnection { implicit c =>
      SQL"""
        select *
        from workout_exercise
        where workout_id = $workoutId
      """
      .as(parser *)
    }
  }(ec)
}
