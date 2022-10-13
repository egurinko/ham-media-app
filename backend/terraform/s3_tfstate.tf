resource "aws_s3_bucket" "ham_media_app_tfstate" {
  bucket = "ham-media-app-tfstate"
}

resource "aws_kms_key" "ham_media_app_kms_key" {
  description = "This key is used to encrypt bucket objects"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "ham_media_app_tfstate" {
  bucket = aws_s3_bucket.ham_media_app_tfstate.bucket

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.ham_media_app_kms_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_versioning" "versioning_ham_media_app" {
  bucket = aws_s3_bucket.ham_media_app_tfstate.id

  versioning_configuration {
    status = "Enabled"
  }
}
