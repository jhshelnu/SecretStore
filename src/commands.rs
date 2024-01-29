use clap::Parser;

#[derive(Parser, Debug)]
#[clap(no_binary_name = true, override_usage = "set|delete|show|exit|help [args]")]
pub enum Command {
    /// Add a new item or update an existing one by name
    #[clap(override_usage = "set <ITEM_NAME> <ITEM_VALUE>")]
    SET { item_name: String, item_value: String },

    /// Delete an existing item by name
    #[clap(override_usage = "delete <ITEM_NAME>")]
    DELETE { item_name: String },

    /// Show all items
    SHOW,

    /// Exit SecretStore
    EXIT,
}