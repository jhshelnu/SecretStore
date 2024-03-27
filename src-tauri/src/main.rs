// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use crate::secret_store::SecretStore;

mod secret_store;
mod ffi;
mod changesets;
mod entity;

/* TODO
 * - use SecureString class that zeroes itself out on drop (zeroize crate + an npm package)
 * - add project README file
 * - tests!
 * - suppress logging when in release mode
 * - close db connection on window close
 * - mui theming
 * - lbase-like CHANGESETS, mark run CHANGESETS
 * - favoriting items
 * - archiving items
 */

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(None::<SecretStore>))
        .invoke_handler(tauri::generate_handler![
            ffi::is_secretstore_initialized,
            ffi::init_secretstore_from_file,
            ffi::create_secretstore,
            ffi::get_logins,
            ffi::create_new_login,
            ffi::delete_login,
            ffi::update_login,
            ffi::close_secretstore,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}