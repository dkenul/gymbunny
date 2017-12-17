package models

object Because {
  def invalidJson (method: String)(target: String) = s"Invalid JSON for $target $method"
  def doesNotExist (target: String) = s"The $target you requested does not exist"

  val invalidPostJson = invalidJson("POST") _
  val invalidPutJson = invalidJson("PUT") _

  val requestMalformed = s"Request body is malformed"
}
