package controllers

import javax.inject.Inject

import models._
import play.api.data._
import play.api.i18n._
import play.api.mvc._

import anorm.SqlParser._
import anorm._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.concurrent.{ExecutionContext, Future}

class ExerciseController @Inject()(
  exerciseService: ExerciseService,
  cc: MessagesControllerComponents
)(implicit ec: ExecutionContext)
extends MessagesAbstractController(cc) {

  def getAll = Action.async { implicit request =>
    exerciseService.list.map { exercises =>
      Ok(Json.toJson(exercises.map(_.toJson)))
    }
  }
}
