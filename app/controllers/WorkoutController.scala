package controllers

import models._
import javax.inject.Inject
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.concurrent.{ExecutionContext, Future}

class WorkoutController @Inject()(
  workoutService: WorkoutService,
  cc: MessagesControllerComponents
)(implicit ec: ExecutionContext)
extends MessagesAbstractController(cc) {

  val table = "workout"

  def get (id: Long) = Action.async { implicit request =>
    workoutService.readDetail(id).map { workoutOpt =>
      workoutOpt.map { workout =>
        Ok(workout.toJson)
      } getOrElse BadRequest(Because doesNotExist table)
    }
  }

  def getUserWorkouts (userId: Long) = Action.async { implicit request =>
    workoutService.list(userId).map { workouts =>
      Ok(Json.toJson(workouts.map(_.toJson)))
    }
  }

  def post = Action.async { implicit request =>
    request.body.asJson.map { json =>
      json.validate[Workout].map { workout =>
        workoutService.insert(workout).map { workout =>
          Ok(workout.toJson)
        }
      } getOrElse Future { BadRequest(Because invalidPostJson table) }
    } getOrElse Future { BadRequest(Because requestMalformed) }
  }

  def delete (id: Long) = Action.async {
    workoutService.delete(id).map(_ => Ok)
  }
}
