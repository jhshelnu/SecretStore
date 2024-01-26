use anyhow::{anyhow, Result};
use base64::Engine;
use base64::prelude::BASE64_STANDARD;

pub fn base64_encode(value: &Vec<u8>) -> String {
    BASE64_STANDARD.encode(value)
}

pub fn base64_decode(value: &str) -> Result<Vec<u8>> {
    BASE64_STANDARD.decode(value).map_err(|_| anyhow!("Invalid Base64 Format"))
}