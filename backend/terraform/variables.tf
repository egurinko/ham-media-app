variable "common" {
  default = {
    service = "ham-media-app"
  }
}

locals {
  aws_locals = merge(local.aws_stg, local.aws_prd)
  aws        = local.aws_locals[terraform.workspace]
}
