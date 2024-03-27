use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Login {
    pub id: u32,
    pub name: String,
    pub username: String,
    pub password: String,
    pub url: String,
    pub favorite: bool,
}