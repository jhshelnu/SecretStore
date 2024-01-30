use anyhow::{Result};
use clap::Parser;
use text_io::read;
use crate::args::Args;
use crate::commands::Command;
use crate::commands::Command::{SET, DELETE, SHOW, EXIT};
use crate::secret_store::SecretStore;

mod encrypt_decrypt;
mod secret_store;
mod base64_encode_decode;
mod args;
mod commands;

/* TODO
 * - add command to get just a single item (vs show which shows all)
 * - give user options during runtime to perform CRUD operations
 * - use SecureString class that zeroes itself out on drop
 * - add project README file
 * - add a UI layer
 * - expand Secrets to have many fields which all get encrypted together
 * - encrypt/decrypt on a per-file basis rather than per-item
 * - tests!
 * - add "--version" command
 */

fn main() -> Result<()> {
    let args = Args::parse();

    let mut store = SecretStore::new(args.password, args.file_path)?;

    println!("SecretStore\n-----------");
    loop {
        print!(">> ");
        let input: String = read!("{}\n");
        match Command::try_parse_from(input.trim().split(" ")) {
            Ok(command) => handle_command(&mut store, &command),
            Err(error) => error.print()?
        }
        println!();
    }
}

fn handle_command(store: &mut SecretStore, command: &Command) {
    match command {
        SET { item_name, item_value } => {
            store.set(&item_name, &item_value);
            println!("Item set successfully.");
        },
        DELETE { item_name } => {
            store.delete(&item_name);
            println!("Item deleted successfully.");
        },
        SHOW => {
            for (item_name, item_value) in store.iter() {
                println!("{item_name}: {item_value}");
            }
        },
        EXIT => {
            store.save();
            std::process::exit(0);
        }
    }
}
