use clap::Parser;

/// Toy implementation of a basic password manager in Rust using the ChaCha20Poly1305 algorithm
#[derive(Parser, Debug)]
#[command(about, long_about = None)]
pub struct Args {
    /// Master password used to decrypt your SecretStore file
    #[arg(short, long)]
    pub password: String,

    /// Path to your SecretStore file
    #[arg(short, long, default_value_t = String::from("./Secretsfile"))]
    pub file_path: String,
}