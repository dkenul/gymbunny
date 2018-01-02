package models

import javax.inject._
import anorm._
import anorm.SqlParser._
import play.api.db.DBApi
import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.concurrent.Future

case class Exercise (
  id: Option[Long],
  name: String
)

object Exercise {
  val parser = for {
    id <- get[Option[Long]]("exercise.id")
    name <- str("exercise.name")
  } yield Exercise(id,name)

  implicit val reads: Reads[Exercise] = (
    (__ \ "id").readNullable[Long] and
    (__ \ "name").read[String]
  )(Exercise.apply _)

  implicit val writes: Writes[Exercise] = (
    (__ \ "id").writeNullable[Long] and
    (__ \ "name").write[String]
  )(unlift(Exercise.unapply))
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

  def list: Future[List[Exercise]] = Future {
    db.withConnection { implicit c =>
      SQL"""
        select *
        from exercise
      """
      .as(parser *)
    }
  }(ec)

  def insert(exercise: Exercise) = Future {
    val id = db.withConnection { implicit c =>
        SQL"""
          insert into exercise (name)
          values (${exercise.name})
        """
        .executeInsert()
    }

    exercise.copy(id = id)
  }(ec)
}
