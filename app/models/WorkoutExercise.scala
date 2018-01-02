package models

import javax.inject._
import anorm._
import anorm.SqlParser._
import com.jaroop.anorm.relational._
import play.api.db.DBApi
import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.concurrent.Future

case class WorkoutExercise (
  id: Option[Long],
  workoutId: Long,
  exerciseId: Long,
  exercise: Option[Exercise],
  workoutExerciseSets: Option[List[WorkoutExerciseSet]]
)

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

  implicit val reads: Reads[WorkoutExercise] = (
    (__ \ "id").readNullable[Long] and
    (__ \ "workoutId").read[Long] and
    (__ \ "exerciseId").read[Long] and
    (__ \ "sets").readNullable[List[WorkoutExerciseSet]]
  )({ (id, workoutId, exerciseId, sets) =>
    WorkoutExercise(id, workoutId, exerciseId, None, sets)
  })

  implicit val writes: Writes[WorkoutExercise] = (
    (__ \ "id").writeNullable[Long] and
    (__ \ "workoutId").write[Long] and
    (__ \ "exerciseId").write[Long] and
    (__ \ "exercise").writeNullable[Exercise] and
    (__ \ "sets").writeNullable[List[WorkoutExerciseSet]]
  )(unlift(WorkoutExercise.unapply))
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
