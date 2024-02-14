// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use crate::secret_store::SecretStore;

mod login;
mod secret_store;
mod ffi;

/* TODO
 * - display logins in UI
 * - fix styling and element alignment
 * - add "create new secretsfile" option using the tauri file save dialog
 * - use SecureString class that zeroes itself out on drop (zeroize crate + an npm package)
 * - add project README file
 * - tests!
 * - suppress logging when in release mode
 */

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(None::<SecretStore>))
        .invoke_handler(tauri::generate_handler![
            ffi::init_secretstore_from_file,
            ffi::get_secretstore_items,
            ffi::close_secretstore,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}