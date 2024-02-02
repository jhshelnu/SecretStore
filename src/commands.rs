use clap::Parser;

#[derive(Parser)]
#[clap(no_binary_name = true, override_usage = "create|read|update|delete|exit|help [args]")]
pub enum Command {
    /// Create a new Login
    #[clap(override_usage = "create <NAME> <USERNAME> <PASSWORD> <URL>")]
    CREATE { name: String, username: String, password: String, url: String },

    /// Read out all Logins
    READ,

    /// Update an existing Login
    #[clap(override_usage = "update <ID> <NAME> <USERNAME> <PASSWORD> <URL>")]
    UPDATE { id: u32, name: String, username: String, password: String, url: String },

    /// Delete an existing Login by ID
    #[clap(override_usage = "delete <ID>")]
    DELETE { id: u32 },

    /// Exit SecretStore
    EXIT,
}