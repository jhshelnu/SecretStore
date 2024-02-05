use clap::Parser;

/// Toy implementation of a basic password manager in Rust using SQLCipher with 256-bit AES encryption
#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
pub struct Args {
    /// Indicates if a new SecretStore file should be created at the specified file path [default: false]
    #[arg(short, long)]
    pub create: bool,

    /// Master password used to decrypt your SecretStore file
    #[arg(short, long)]
    pub password: String,

    /// Path to your SecretStore file
    #[arg(short, long, default_value_t = String::from("./Secretsfile"))]
    pub file_path: String,
}