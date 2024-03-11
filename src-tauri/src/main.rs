// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use crate::secret_store::SecretStore;

mod login;
mod secret_store;
mod ffi;

/* TODO
 * - use SecureString class that zeroes itself out on drop (zeroize crate + an npm package)
 * - add project README file
 * - tests!
 * - suppress logging when in release mode
 * - close db connection on window close
 */

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(None::<SecretStore>))
        .invoke_handler(tauri::generate_handler![
            ffi::is_secretstore_initialized,
            ffi::init_secretstore_from_file,
            ffi::create_secretstore,
            ffi::get_secretstore_items,
            ffi::create_new_login,
            ffi::delete_login,
            ffi::close_secretstore,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}