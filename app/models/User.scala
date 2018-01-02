package models

import javax.inject._
import anorm._
import anorm.SqlParser._
import play.api.db.DBApi
import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.concurrent.Future

case class User (
  id: Option[Long],
  username: String,
  firstName: String,
  lastName: String,
  email: String
)

object User {
  val parser = for {
    id <- get[Option[Long]]("user.id")
    username <- get[String]("user.username")
    firstName <- get[String]("user.first_name")
    lastName <- get[String]("user.last_name")
    email <- get[String]("user.email")
  } yield User(id,username,firstName,lastName,email)

  implicit val reads: Reads[User] = (
    (__ \ "id").readNullable[Long] and
    (__ \ "username").read[String] and
    (__ \ "firstName").read[String] and
    (__ \ "lastName").read[String] and
    (__ \ "email").read[String]
  )(User.apply _)

  implicit val writes: Writes[User] = (
    (__ \ "id").writeNullable[Long] and
    (__ \ "username").write[String] and
    (__ \ "firstName").write[String] and
    (__ \ "lastName").write[String] and
    (__ \ "email").write[String]
  )(unlift(User.unapply))
}

@Singleton
class UserService @Inject()(dbapi: DBApi)(implicit ec: DatabaseExecutionContext) {

  private val db = dbapi.database("default")

  val parser = User.parser

  def list:Future[List[User]] = Future {
    db.withConnection { implicit c =>
      SQL"""
        select *
        from user
      """
      .as(parser *)
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
        SQL"""
          insert into user (username, first_name, last_name, email)
          values (${user.username}, ${user.firstName}, ${user.lastName}, ${user.email})
        """
        .executeInsert()
    }

    user.copy(id = id)
  }(ec)
}
