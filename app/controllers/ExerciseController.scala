package controllers

import models._
import javax.inject.Inject
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.concurrent.{ExecutionContext, Future}

class ExerciseController @Inject()(
  exerciseService: ExerciseService,
  cc: MessagesControllerComponents
)(implicit ec: ExecutionContext)
extends MessagesAbstractController(cc) {

  val table = "exercise"

  def getAll = Action.async { implicit request =>
    exerciseService.list.map { exercises =>
      Ok(Json.toJson(exercises.map(_.toJson)))
    }
  }

  def post = Action.async { implicit request =>
    request.body.asJson.map { json =>
      json.validate[Exercise].map { exercise =>
        exerciseService.insert(exercise).map { exercise =>
          Ok(exercise.toJson)
        }
      } getOrElse Future { BadRequest(Because invalidPostJson table) }
    } getOrElse Future { BadRequest(Because requestMalformed) }
  }
}
