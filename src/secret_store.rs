use anyhow::{anyhow, Result};
use std::collections::HashMap;
use std::fs;
use chacha20poly1305::{Key};
use pbkdf2::pbkdf2_hmac_array;
use sha2::Sha256;
use crate::base64_encode_decode::{base64_decode, base64_encode};
use crate::encrypt_decrypt::{decrypt, encrypt};

const HASHING_ROUNDS: u32 = 1_000;
const ENCRYPTION_KEY_SIZE: usize = 32;

const INVALID_FORMAT_MSG: &str = "Invalid SecretStore format";

pub struct SecretStore {
    contents: HashMap<String, String>,
    key: Key,
    file_path: String
}

impl SecretStore {
    pub fn new(password: &str, file_path: &str) -> Result<Self> {
        let key = Key::from(pbkdf2_hmac_array::<Sha256, ENCRYPTION_KEY_SIZE>(password.as_bytes(), b"", HASHING_ROUNDS));
        Ok(Self {
            contents: Self::decrypt_store(&key, file_path)?,
            key,
            file_path: file_path.to_owned()
        })
    }

    pub fn put(&mut self, name: &str, value: &str) {
        self.contents.insert(name.to_owned(), value.to_owned());
    }

    pub fn get(&self, name: &str) -> Option<&String> {
        self.contents.get(name)
    }

    pub fn clear(&mut self) {
        self.contents.clear();
    }

    // static method since this runs before a new instance is created
    fn decrypt_store(key: &Key, file_path: &str) -> Result<HashMap<String, String>> {
        let file_contents = fs::read_to_string(file_path).unwrap_or(String::new());
        let mut contents = HashMap::new();

        for line in file_contents.lines() {
            // grab the item_key and item_value (encrypted and stored as base64)
            let (item_key, item_value) = line.split_once(" ").ok_or_else(|| anyhow!(INVALID_FORMAT_MSG))?;

            // decode the base64 value
            let item_value = base64_decode(item_value).map_err(|_| anyhow!(INVALID_FORMAT_MSG))?;

            // decrypt the item_value bytes
            let item_value = decrypt(&key, &item_value).map_err(|_| anyhow!(INVALID_FORMAT_MSG))?;

            // convert the decrypted bytes into a UTF-8 String
            let item_value = String::from_utf8(item_value)?;

            contents.insert(item_key.to_owned(), item_value);
        }

        Ok(contents)
    }

    // non-static method since this runs after an instance has been created
    fn encrypt_store(&self) {
        let file_contents = self.contents.iter()
            .map(|(item_key, item_value)| {
                let item_value_encrypted = encrypt(&self.key, item_value.as_bytes()).unwrap();
                (item_key, item_value_encrypted)
            })
            .map(|(item_key, item_value)| {
                let item_value_base64_encoded = base64_encode(&item_value);
                (item_key, item_value_base64_encoded)
            })
            .map(|(item_key, item_value)| format!("{item_key} {item_value}"))
            .collect::<Vec<String>>()
            .join("\n");

        fs::write(&self.file_path, &file_contents).expect("SecretStore file/location to be valid and writable");
    }
}

impl Drop for SecretStore {
    fn drop(&mut self) {
        self.encrypt_store();
    }
}