use anyhow::{Result};
use crate::secret_store::SecretStore;

mod encrypt_decrypt;
mod secret_store;
mod base64_encode_decode;

/* TODO
 * - load password and file_path from env vars or program args (`clap` crate would be good to use)
 * - give user options during runtime to perform CRUD operations
 * - use SecureString class that zeroes itself out on drop
 */

fn main() -> Result<()> {
    // let mut store = SecretStore::new("very secure password", "./secrets").unwrap();
    //
    // store.put("test", "this is a test");
    // store.put("test2", "this is also a test!");
    //
    // drop(store);

    let mut store = SecretStore::new("very secure password", "./secrets").unwrap();

    store.clear();

    if let Some(secret) = store.get("test") {
        println!("The secret value for 'test' is '{secret}'");
    }

    Ok(())
}
