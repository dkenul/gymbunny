package models

import java.util.Date
import javax.inject._

import anorm.SqlParser._
import anorm._
import com.jaroop.anorm.relational._

import play.api.db.DBApi
import play.api.libs.json._

import scala.concurrent.Future

case class WorkoutExerciseSet (
  id: Option[Long],
  weight: Double,
  reps: Int,
) {

  def toJson: JsValue = Json.obj(
    "id" -> id,
    "weight" -> weight,
    "reps" -> reps
  )
}

object WorkoutExerciseSet {

  val parser = for {
    id <- get[Option[Long]]("workout_exercise_set.id")
    weight <- double("workout_exercise_set.weight")
    reps <- int("workout_exercise_set.reps")
  } yield WorkoutExerciseSet(id, weight, reps)

  val relationalParser = parser
}
