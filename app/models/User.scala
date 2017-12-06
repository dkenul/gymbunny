package models

import java.util.Date
import javax.inject.Inject

import anorm.SqlParser._
import anorm._
import play.api.db.DBApi
import play.api.libs.json._

import scala.concurrent.Future

case class User (
  id: Option[Long],
  username: String,
  firstName: String,
  lastName: String,
  email: String
) {
  def toJson:JsObject = Json.obj(
    "id" -> id,
    "username" -> username,
    "firstName" -> firstName,
    "lastName" -> lastName,
    "email" -> email
  )
}

@javax.inject.Singleton
class UserService @Inject()(dbapi: DBApi)(implicit ec: DatabaseExecutionContext) {

  private val db = dbapi.database("default")

  val parser = for {
    id <- get[Option[Long]]("user.id")
    username <- get[String]("user.username")
    firstName <- get[String]("user.first_name")
    lastName <- get[String]("user.last_name")
    email <- get[String]("user.email")
  } yield User(id,username,firstName,lastName,email)


  def list:Future[List[User]] = Future {
    db.withConnection { implicit c =>
      SQL(
        """
          select *
          from user
        """
      ).as(parser *)
    }
  }(ec)

  def read(id: Long): Future[Option[User]] = Future {
    db.withConnection { implicit c =>
      SQL"""
        select *
        from user
        where id = $id
      """
      .as(parser *)
      .headOption
    }
  }(ec)

  def insert(user: User) = Future {
    val id = db.withConnection { implicit c =>
      SQL(
        """
          insert into user (username, first_name, last_name, email)
          values ({username}, {first_name}, {last_name}, {email})
        """
      ).on(
        'username -> user.username,
        'first_name -> user.firstName,
        'last_name -> user.lastName,
        'email -> user.email
      ).executeInsert()
    }

    user.copy(id = id)
  }(ec)
}
