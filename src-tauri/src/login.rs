use std::fmt::Display;
use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct Login {
    pub id: u32,
    pub name: String,
    pub username: String,
    pub password: String,
    pub url: String,
}