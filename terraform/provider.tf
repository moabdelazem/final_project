terraform {
  # Configure the version of Terraform to use
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  # Configure the backend
  # This is where the state file will be stored
  # This is a remote backend that stores the state file in an S3 bucket
  backend "s3" {
    bucket = "team1-state-final-project"
    key    = "terraform/state/terraform.tfstate"
    region = "us-east-1"
  }
}

# Set the AWS provider With Region of `us-east-1`
provider "aws" {
  region = "us-east-1"
}
