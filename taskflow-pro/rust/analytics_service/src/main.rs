use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Json},
    routing::get,
    Router,
};
use chrono::{Duration, NaiveDate, Utc};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::{collections::{HashMap, HashSet}, net::SocketAddr};
use tower_http::cors::{Any, CorsLayer};

#[derive(Clone)]
struct AppState {
    client: Client,
    backend_url: String,
}

#[derive(Deserialize)]
struct Task {
    status: Option<String>,
    due_date: Option<String>,
    project_id: Option<i32>,
}

#[derive(Serialize)]
struct Analytics {
    total_tasks: usize,
    per_status: HashMap<String, usize>,
    due_soon: usize,
    projects_involved: usize,
    generated_at: String,
}

#[tokio::main]
async fn main() {
    let port = std::env::var("RUST_ANALYTICS_PORT").unwrap_or_else(|_| "6000".to_string());
    let addr: SocketAddr = format!("0.0.0.0:{}", port).parse().expect("Invalid port");

    let state = AppState {
        client: Client::new(),
        backend_url: std::env::var("BACKEND_BASE_URL").unwrap_or_else(|_| "http://127.0.0.1:5000/api".into()),
    };

    let cors = CorsLayer::new().allow_origin(Any).allow_methods(Any);

    let app = Router::new()
        .route("/health", get(health))
        .route("/analytics", get(get_analytics))
        .with_state(state)
        .layer(cors);

    println!("Rust analytics service listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service_with_connect_info::<SocketAddr, _>())
        .await
        .unwrap();
}

async fn health() -> impl IntoResponse {
    (StatusCode::OK, Json(json!({"status": "ok"})))
}

async fn get_analytics(State(state): State<AppState>) -> impl IntoResponse {
    match fetch_task_data(state.clone()).await {
        Ok(payload) => (StatusCode::OK, Json(payload)).into_response(),
        Err(err) => {
            eprintln!("analytics error: {}", err);
            (StatusCode::BAD_GATEWAY, Json(json!({"error": err}))).into_response()
        }
    }
}

async fn fetch_task_data(state: AppState) -> Result<Analytics, String> {
    let url = format!("{}/tasks", state.backend_url.trim_end_matches('/'));
    let tasks: Vec<Task> = state
        .client
        .get(url)
        .send()
        .await
        .map_err(|err| err.to_string())?
        .json()
        .await
        .map_err(|err| err.to_string())?;

    let mut per_status = HashMap::new();
    let mut due_soon = 0;
    let mut project_ids = HashSet::new();

    let today = Utc::now().date_naive();
    let limit = today + Duration::days(3);

    for task in tasks.iter() {
        if let Some(status) = task.status.clone() {
            *per_status.entry(status).or_insert(0) += 1;
        } else {
            *per_status.entry("todo".into()).or_insert(0) += 1;
        }

        if let Some(ref date_str) = task.due_date {
            if let Ok(date) = NaiveDate::parse_from_str(date_str, "%Y-%m-%d") {
                if date >= today && date <= limit {
                    due_soon += 1;
                }
            }
        }

        if let Some(project_id) = task.project_id {
            project_ids.insert(project_id);
        }
    }

    Ok(Analytics {
        total_tasks: tasks.len(),
        per_status,
        due_soon,
        projects_involved: project_ids.len(),
        generated_at: Utc::now().to_rfc3339(),
    })
}
