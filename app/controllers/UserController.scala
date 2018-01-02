package controllers

import models._
import javax.inject.Inject
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(userService: UserService, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
extends MessagesAbstractController(cc) {

  val table = "user"

  def getAll = Action.async { implicit request =>
    userService.list.map { users =>
      Ok(Json.toJson(users))
    }
  }

  def get (id: Long) = Action.async { implicit request =>
    userService.read(id).map { maybeUser =>
      maybeUser.map { user =>
        Ok(Json.toJson(user))
      } getOrElse BadRequest(Because doesNotExist table)
    }
  }

  def post = Action.async { implicit request =>
    request.body.asJson.map { json =>
      json.validate[User].map { user =>
        userService.insert(user).map { user =>
          Ok(Json.toJson(user))
        }
      } getOrElse Future { BadRequest(Because invalidPostJson table) }
    } getOrElse Future { BadRequest(Because requestMalformed) }
  }
}
