terraform {
  backend "s3" {
    profile = "private"
    region  = "ap-northeast-1"
    bucket  = "ham-media-app-tfstate"
    key     = "ham-media-app.tfstate"
    encrypt = true

    dynamodb_table = "ham_media_app_state_lock"
  }
}
