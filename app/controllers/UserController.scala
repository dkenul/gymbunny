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
      Ok(Json.toJson(users.map(_.toJson)))
    }
  }

  def get (id: Long) = Action.async { implicit request =>
    userService.read(id).map { maybeUser =>
      maybeUser.map { user =>
        Ok(user.toJson)
      } getOrElse BadRequest(Because doesNotExist table)
    }
  }

  def postValidate: Reads[User] = (
    (__ \ "id").readNullable[Long] and
    (__ \ "username").read[String] and
    (__ \ "firstName").read[String] and
    (__ \ "lastName").read[String] and
    (__ \ "email").read[String]
  )(User.apply _)

  def post = Action.async { implicit request =>
    request.body.asJson.map { json =>
      json.validate(postValidate).map { user =>
        userService.insert(user).map { user =>
          Ok(user.toJson)
        }
      } getOrElse Future { BadRequest(Because invalidPostJson table) }
    } getOrElse Future { BadRequest(Because requestMalformed) }
  }
}
