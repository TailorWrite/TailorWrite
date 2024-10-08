# Defines the provider (AWS) and initialises the base configuration of the project. 

provider "aws" {
    region  = var.aws_region
    access_key = var.access_key
    secret_key = var.secret_key
    token = var.session_token
}
