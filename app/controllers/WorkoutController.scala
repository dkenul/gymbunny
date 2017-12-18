package controllers

import javax.inject.Inject
import java.util.Date

import models._
import play.api.data.Forms._
import play.api.data._
import play.api.i18n._
import play.api.mvc._
import views._

import anorm.SqlParser._
import anorm._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.concurrent.{ExecutionContext, Future}

class WorkoutController @Inject()(
  workoutService: WorkoutService,
  cc: MessagesControllerComponents
)(implicit ec: ExecutionContext)
extends MessagesAbstractController(cc) {

  def get (id: Long) = Action.async { implicit request =>
    workoutService.readDetail(id).map { workoutOpt =>
      workoutOpt.map { workout =>
        Ok(workout.toJson)
      } getOrElse BadRequest("This User does not exist")
    }
  }

  def getUserWorkouts (userId: Long) = Action.async { implicit request =>
    workoutService.list(userId).map { workouts =>
      Ok(Json.toJson(workouts.map(_.toJson)))
    }
  }

  // implicit val workoutReads: Reads[Workout] = (
  //   (__ \ "id").readNullable[Long] and
  //   (__ \ "userId").read[Long] and
  //   (__ \ "onDate").read[Date] and
  //   (__ \ "description").read[String]
  // )({ (id, userId, onDate, description) =>
  //   Workout(None, userId, onDate, description, None)
  // })

  def post = Action.async { implicit request =>
    request.body.asJson.map { json =>
      json.validate[Workout].map { workout =>
        workoutService.insert(workout).map { workout =>
          Ok(workout.toJson)
        }
      } getOrElse Future { BadRequest(Because invalidPostJson "workout") }
    } getOrElse Future { BadRequest(Because requestMalformed) }
  }
}
