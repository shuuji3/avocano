resource "google_cloud_run_service" "server" {
  name                       = var.random_suffix ? "${var.service_name}-${random_id.suffix.hex}" : var.service_name
  location                   = var.region
  autogenerate_revision_name = true
  labels                     = var.labels

  template {
    spec {
      service_account_name = google_service_account.server.email
      containers {
        image = var.server_image
        env {
          name = "DJANGO_ENV"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.django_settings.secret_id
              key  = "latest"
            }
          }
        }
      }
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "100"
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.postgres.connection_name
        "run.googleapis.com/client-name"        = "terraform"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_secret_manager_secret.django_settings
  ]
}


# Allow server to be public readable. 
data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "server_noauth" {
  location    = google_cloud_run_service.server.location
  project     = google_cloud_run_service.server.project
  service     = google_cloud_run_service.server.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
