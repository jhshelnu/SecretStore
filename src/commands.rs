use clap::Parser;

#[derive(Parser, Debug)]
#[clap(no_binary_name = true, override_usage = "set|delete|show|exit [args]")]
pub enum Command {
    #[clap(override_usage = "set <ITEM_NAME> <ITEM_VALUE>")]
    SET { item_name: String, item_value: String },
    #[clap(override_usage = "delete <ITEM_NAME>")]
    DELETE { item_name: String },
    SHOW,
    EXIT,
}