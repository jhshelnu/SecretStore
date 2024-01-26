use anyhow::{anyhow, Result};
use chacha20poly1305::{Key, Nonce};
use chacha20poly1305::{ChaCha20Poly1305, KeyInit};
use chacha20poly1305::aead::{Aead};

pub fn encrypt(key: &Key, plaintext: &[u8]) -> Result<Vec<u8>> {
    let cipher = ChaCha20Poly1305::new(key);
    cipher.encrypt(&Nonce::default(), plaintext).map_err(|_| anyhow!("Error occurred during encryption"))
}

pub fn decrypt(key: &Key, ciphertext: &[u8]) -> Result<Vec<u8>> {
    let cipher = ChaCha20Poly1305::new(key);
    cipher.decrypt(&Nonce::default(), ciphertext).map_err(|_| anyhow!("Error occurred during decryption"))
}