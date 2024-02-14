use std::sync::Mutex;
use crate::login::Login;
use crate::secret_store::SecretStore;

type MutexStore<'state> = tauri::State<'state, Mutex<Option<SecretStore>>>;

#[tauri::command]
pub fn init_secretstore_from_file(
    file_path: &str,
    password: &str,
    mutex: MutexStore<'_>
) -> Result<(), String> {
    let x = SecretStore::from_file(file_path, password)
        .map(|store| *mutex.lock().unwrap() = Some(store))
        .map_err(|e| {
            println!("{e}"); // todo: probably dont want to log in release builds, look into rust logging crate
            "Error loading SecretStore. Verify the given file and password are correct".into()
        });
    return x;
}

#[tauri::command]
pub fn get_secretstore_items(mutex: MutexStore<'_>) -> Vec<Login> {
    // todo: handle errors better - make this return a Result<Vec<Login>, ()> and if Err(()) is returned, have UI redirect to home screen and show generic error
    let store = mutex.lock().unwrap();
    store.as_ref().unwrap().read().unwrap()
}

#[tauri::command]
pub fn close_secretstore(mutex: MutexStore<'_>) {
    // drop the open connection to the DB
    let mut store = mutex.lock().unwrap();
    *store = None;
}