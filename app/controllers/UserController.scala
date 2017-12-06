package controllers

import javax.inject.Inject

import models._
import play.api.data.Forms._
import play.api.data._
import play.api.i18n._
import play.api.mvc._
import views._

import play.api.libs.json._
import play.api.libs.functional.syntax._


import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(userService: UserService, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
extends MessagesAbstractController(cc) {

  val postForm = Form(
    mapping(
      "id" -> ignored(None: Option[Long]),
      "username" -> text,
      "firstName" -> text,
      "lastName" -> text,
      "email" -> text
    )(User.apply)(User.unapply)
  )

  def getAll = Action.async { implicit request =>
    userService.list.map { users =>
      Ok(Json.obj("users" -> users.map(_.toJson)))
    }
  }

  def get (id: Long) = Action.async { implicit request =>
    userService.read(id).map { maybeUser =>
      maybeUser.map { user =>
        Ok(user.toJson)
      } getOrElse Status(404)("This User does not exist")
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
        // json.validate(postValidate) match {
        //   case s: JsSuccess[User] => Ok(userService.insert(s.get).toJson)
        //   case e: JsError => Future { Status(404)(JsError.toJson(e)) }
        // }

        json.validate(postValidate).map { user =>
          userService.insert(user).map { user =>
            Ok(user.toJson)
          }
        } getOrElse Future { Ok(Json.obj("wut" -> 1)) }


      // match {
      //   case s: JsSuccess[User] => Ok(Json.obj("ok" -> 1))
      //   case e: JsError => Status(404)(JsError.toJson(e))
      // }
    } getOrElse Future { Ok(Json.obj("wut" -> 1)) }
  }
}
