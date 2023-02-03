# Terraform

terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
}

data "google_project" "project" {
  project_id = var.project
}
