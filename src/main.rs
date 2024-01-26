use anyhow::{Result};
use clap::Parser;
use crate::args::Args;
use crate::secret_store::SecretStore;

mod encrypt_decrypt;
mod secret_store;
mod base64_encode_decode;
mod args;

/* TODO
 * - give user options during runtime to perform CRUD operations
 * - use SecureString class that zeroes itself out on drop
 */

fn main() -> Result<()> {
    let args = Args::parse();

    let store = SecretStore::new(args.password, args.file_path).unwrap();

    for (item_name, item_value) in store.iter() {
        println!("item_name={item_name}, item_value={item_value}")
    }

    Ok(())
}
