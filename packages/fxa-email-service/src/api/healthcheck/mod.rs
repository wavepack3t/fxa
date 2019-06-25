// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, you can obtain one at https://mozilla.org/MPL/2.0/.

//! Route handlers for our heathcheck endpoints.
//!
//! * `GET /__version__`
//! * `GET /__lbheartbeat__`
//! * `GET /__heartbeat__`

use reqwest::Client as RequestClient;
use rocket::State;
use rocket_contrib::json::Json;
use serde_json;

use crate::{settings::Settings, types::error::AppResult};

#[cfg(test)]
mod test;

#[get("/__version__")]
fn version<T>() -> Json<T> {
    Json(serde_json::from_str(include_str!("../../../version.json")).unwrap())
}

#[get("/__lbheartbeat__")]
fn lbheartbeat<T>() -> Json<T> {
    Json(json!({}))
}

#[get("/__heartbeat__")]
fn heartbeat(settings: State<Settings>) -> AppResult<Settings> {
    RequestClient::new()
        .get(&format!("{}__heartbeat__", settings.authdb.baseuri))
        .send()
        .map(|_| Ok(Json(json!({}))))?
}
