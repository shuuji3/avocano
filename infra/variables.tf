variable "project" {
  type        = string
  description = "Google Cloud Project ID"
}

variable "region" {
  default     = "us-central1"
  type        = string
  description = "Google Cloud Region"
}

variable "instance_name" {
  type        = string
  default     = "psql"
  description = "Cloud SQL Instance name"
}

variable "service_name" {
  type        = string
  default     = "server"
  description = "Cloud Run service name"
}

variable "server_image" { 
  type = string
  default = "gcr.io/avocano/server"
  description = "Server image"
}

variable "database_name" {
  type        = string
  default     = "django"
  description = "Cloud SQL database name"
}

variable "database_username" {
  type        = string
  default     = "server"
  description = "Cloud SQL database name"
}

variable "labels" {
  type        = map(string)
  description = "A set of key/value label pairs to assign to the resources deployed by this blueprint."
  default     = {}
}
