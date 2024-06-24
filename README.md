# SecretStore

This is the source code for SecretStore, a simple password manager written in Rust and Typescript using [Tauri](https://github.com/tauri-apps/tauri) and [Next.js](https://github.com/vercel/next.js).

Unencrypted screts are never written to disk. Encryption is handled by [SQLCipher](https://github.com/sqlcipher/sqlcipher), a fork of [SQLite](https://github.com/sqlite/sqlite), which allows for AES 256-bit encryption.

> [!IMPORTANT]
> This is a hobby project and is not battle-tested or guaranteed to be secure. Use at your own risk!

## Screenshots
- Creating a new vault (.secretstore file)
![image](https://github.com/jhshelnu/SecretStore/assets/36553058/cba24b1f-a083-402b-a493-efecc0ee9e91)

- Opening an existing vault
![open existing](https://github.com/jhshelnu/SecretStore/assets/36553058/488eb1e8-d760-42fd-ae5e-efa775d998b5)

- Viewing logins
![logins](https://github.com/jhshelnu/SecretStore/assets/36553058/bd490b3f-77ac-4866-acf2-9095654d3d1f)

- Creating a new login
![new login](https://github.com/jhshelnu/SecretStore/assets/36553058/c557e041-9e58-454e-ae29-c5d755033c4d)

## Running locally
To get started, you'll need `cargo` and `npm`
1. With the project pulled down, start by installing the front end dependencies:

     `cd src-next && npm install`

   (You can find the generated executable at `src-tauri/target/debug/SecretStore.exe`)


3. Back at the project root, you can start a development build with:

     `cargo tauri dev`

4. A production build can be created with:

     `cargo tauri build`

   (You can find the generated installers at `src-tauri/target/release/bundle`)

