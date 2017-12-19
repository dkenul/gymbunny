package models

import javax.inject._
import anorm._
import anorm.SqlParser._
import com.jaroop.anorm.relational._
import play.api.db.DBApi
import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.concurrent.Future

case class WorkoutExerciseSet (
  id: Option[Long],
  workoutExerciseId: Long,
  weight: Double,
  reps: Int,
) {

  def toJson: JsValue = Json.obj(
    "id" -> id,
    "workoutExerciseId" -> workoutExerciseId,
    "weight" -> weight,
    "reps" -> reps
  )
}

object WorkoutExerciseSet {

  val parser = for {
    id <- get[Option[Long]]("workout_exercise_set.id")
    workoutExerciseId <- long("workout_exercise_set.workout_exercise_id")
    weight <- double("workout_exercise_set.weight")
    reps <- int("workout_exercise_set.reps")
  } yield WorkoutExerciseSet(id, workoutExerciseId, weight, reps)

  val relationalParser = parser

  implicit val reads: Reads[WorkoutExerciseSet] = (
    (__ \ "id").readNullable[Long] and
    (__ \ "workoutExerciseId").read[Long] and
    (__ \ "weight").read[Double] and
    (__ \ "reps").read[Int]
  )(WorkoutExerciseSet.apply _)
}
