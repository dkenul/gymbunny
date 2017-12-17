package models

import java.util.Date
import javax.inject._

import anorm.SqlParser._
import anorm._

import play.api.db.DBApi
import play.api.libs.json._

import scala.concurrent.Future

case class Exercise (
  id: Option[Long],
  name: String
) {

  def toJson: JsObject = Json.obj(
    "id" -> id,
    "name" -> name
  )
}

object Exercise {
  val parser = for {
    id <- get[Option[Long]]("exercise.id")
    name <- str("exercise.name")
  } yield Exercise(id,name)
}

@Singleton
class ExerciseService @Inject()(dbapi: DBApi)(implicit ec: DatabaseExecutionContext) {

  private val db = dbapi.database("default")

  val parser = Exercise.parser

  def read(id: Long): Future[Option[Exercise]] = Future {
    db.withConnection { implicit c =>
      SQL"""
        select *
        from exercise
        where id = $id
      """
      .as(parser *)
      .headOption
    }
  }(ec)
}
