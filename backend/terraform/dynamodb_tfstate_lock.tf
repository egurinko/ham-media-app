resource "aws_dynamodb_table" "ham_media_app_state_lock" {
  name           = "ham_media_app_state_lock"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
