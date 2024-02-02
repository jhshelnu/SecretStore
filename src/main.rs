use anyhow::Result;
use clap::Parser;
use text_io::read;
use crate::args::Args;
use crate::commands::Command;
use crate::commands::Command::{CREATE, READ, UPDATE, DELETE, EXIT};
use crate::secret_store::SecretStore;

mod args;
mod commands;
mod login;
mod secret_store;

/* TODO
 * - use SecureString class that zeroes itself out on drop (zeroize crate)
 * - add project README file
 * - add a UI layer
 * - tests!
 * - add "--version" command
 */

fn main() -> Result<()> {
    let args = Args::parse();

    let mut store = if args.create {
        SecretStore::new(args.password, args.file_path)?
    } else {
        SecretStore::from_file(args.password, args.file_path)?
    };

    println!("SecretStore\n-----------");
    loop {
        print!(">> ");
        let input: String = read!("{}\n");
        match Command::try_parse_from(input.trim().split(" ")) {
            Ok(command) => handle_command(&mut store, &command)?,
            Err(error) => error.print()?
        }
        println!();
    }
}

fn handle_command(store: &mut SecretStore, command: &Command) -> Result<()> {
    match command {
        CREATE { name, username, password, url } => {
            store.create(name, username, password, url)?;
            println!("Login created successfully.");
        },
        READ => {
            for login in store.read()? {
                println!("{}", login);
            }
        },
        UPDATE { id, name, username, password, url } => {
            store.update(id, name, username, password, url)?;
            println!("Login updated successfully.");
        },
        DELETE { id } => {
            store.delete(id)?;
            println!("Login deleted successfully.");
        },
        EXIT => std::process::exit(0)
    }

    Ok(())
}
