resource "google_cloud_run_v2_job" "setup" {
  name         = var.random_suffix ? "setup-${random_id.suffix.hex}" : "setup"
  location     = var.region
  launch_stage = "BETA"

  labels = var.labels

  template {
    template {
      service_account = google_service_account.automation.email
      containers {
        image   = var.server_image
        command = ["setup"]
        env {
          name = "DJANGO_ENV"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.django_settings.secret_id
              version = "latest"
            }
          }
        }
        env {
          name = "ADMIN_PASSWORD"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.django_admin_password.secret_id
              version = "latest"
            }
          }
        }
        volume_mounts {
          name       = "cloudsql"
          mount_path = "/cloudsql"
        }
      }
      volumes {
        name = "cloudsql"
        cloud_sql_instance {
          instances = [google_sql_database_instance.postgres.connection_name]
        }
      }
    }
  }
}

resource "google_cloud_run_v2_job" "migrate" {
  name         = var.random_suffix ? "migrate-${random_id.suffix.hex}" : "migrate"
  location     = var.region
  launch_stage = "BETA"

  labels = var.labels

  template {
    template {
      service_account = google_service_account.automation.email
      containers {
        image   = var.server_image
        command = ["migrate"]
        env {
          name = "DJANGO_ENV"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.django_settings.secret_id
              version = "latest"
            }
          }
        }
        volume_mounts {
          name       = "cloudsql"
          mount_path = "/cloudsql"
        }
      }
      volumes {
        name = "cloudsql"
        cloud_sql_instance {
          instances = [google_sql_database_instance.postgres.connection_name]
        }
      }
    }
  }
}