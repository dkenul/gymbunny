package controllers

import javax.inject.Inject

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

}
