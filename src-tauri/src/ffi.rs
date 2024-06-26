use anyhow::Result;
use std::sync::Mutex;
use crate::entity::login::Login;
use crate::secret_store::SecretStore;

type MutexStore<'state> = tauri::State<'state, Mutex<Option<SecretStore>>>;

#[tauri::command]
pub fn is_secretstore_initialized(mutex: MutexStore<'_>) -> bool {
    mutex.lock().unwrap().is_some()
}

#[tauri::command]
pub fn init_secretstore_from_file(
    file_path: &str,
    password: &str,
    mutex: MutexStore<'_>
) -> Result<(), ()> {
    SecretStore::from_file(file_path, password)
        .map(|store| *mutex.lock().unwrap() = Some(store))
        .map_err(|_| ())
}

#[tauri::command]
pub fn create_secretstore(
    file_path: &str,
    password: &str,
    mutex: MutexStore<'_>
) -> Result<(), ()> {
    SecretStore::new(file_path, password)
        .map(|store| *mutex.lock().unwrap() = Some(store))
        .map_err(|_| ())
}

#[tauri::command]
pub fn get_logins(mutex: MutexStore<'_>) -> Vec<Login> {
    let store = mutex.lock().unwrap();
    store.as_ref().unwrap().get_all().unwrap()
}

#[tauri::command]
pub fn get_favorite_logins(mutex: MutexStore<'_>) -> Vec<Login> {
    let store = mutex.lock().unwrap();
    store.as_ref().unwrap().get_favorites().unwrap()
}

#[tauri::command]
pub fn get_archived_logins(mutex: MutexStore<'_>) -> Vec<Login> {
    let store = mutex.lock().unwrap();
    store.as_ref().unwrap().get_archived().unwrap()
}

#[tauri::command]
pub fn create_new_login(mutex: MutexStore<'_>, login: Login) {
    let mut store = mutex.lock().unwrap();
    store.as_mut().unwrap().create(&login).unwrap();
}

#[tauri::command]
pub fn delete_login(mutex: MutexStore<'_>, id: u32) {
    let mut store = mutex.lock().unwrap();
    store.as_mut().unwrap().delete(&id).unwrap();
}

#[tauri::command]
pub fn update_login(mutex: MutexStore<'_>, login: Login) {
    let mut store = mutex.lock().unwrap();
    store.as_mut().unwrap().update(&login).unwrap();
}

#[tauri::command]
pub fn close_secretstore(mutex: MutexStore<'_>) {
    // drop the open connection to the DB
    let mut store = mutex.lock().unwrap();
    *store = None;
}