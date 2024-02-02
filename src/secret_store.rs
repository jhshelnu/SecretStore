use std::path::Path;
use anyhow::{anyhow, Result};
use rusqlite::{Connection, DatabaseName, OpenFlags, params};
use crate::login::Login;

pub struct SecretStore {
    conn: Connection
}

impl SecretStore {
    pub fn new(password: String, file_path: String) -> Result<Self> {
        if Path::new(&file_path).is_file() {
            return Err(anyhow!("A file already exists at the specified file path. Try renaming the existing file or rerunning without '--create'"));
        }

        let mut conn = Connection::open_with_flags(file_path, OpenFlags::default())?;
        conn.pragma_update(Some(DatabaseName::Main), "key", password)?;
        Self::init_db_schema(&mut conn)?;
        Ok(Self { conn })
    }

    pub fn from_file(password: String, file_path: String) -> Result<Self> {
        if !Path::new(&file_path).is_file() {
            return Err(anyhow!("No SecretStore file found at the specified file path. Try a different file path or rerunning with '--create'"));
        }

        let conn = Connection::open_with_flags(file_path, OpenFlags::default() & !OpenFlags::SQLITE_OPEN_CREATE)?;
        conn.pragma_update(Some(DatabaseName::Main), "key", password)?;
        Ok(Self { conn })
    }

    fn init_db_schema(conn: &mut Connection) -> Result<()> {
        conn.execute("create table login (
            id integer primary key,
            name text not null,
            username text not null,
            password text not null,
            url text not null
        )", ())?;

        Ok(())
    }

    pub fn create(&mut self, name: &str, username: &str, password: &str, url: &str) -> Result<()> {
        self.conn.execute("insert into login (name, username, password, url)
            values (:name, :username, :password, :url)", &[
                (":name",     name),
                (":username", username),
                (":password", password),
                (":url",      url),
        ])?;
        Ok(())
    }

    pub fn read(&self) -> Result<Vec<Login>> {
        let mut stmt = self.conn.prepare("select id, name, username, password, url from login")?;
        let login_results = stmt.query_map([], |row|
            Ok(Login {
                id:       row.get(0)?,
                name:     row.get(1)?,
                username: row.get(2)?,
                password: row.get(3)?,
                url:      row.get(4)?,
            })
        )?;

        let mut logins = Vec::new();
        for login_result in login_results {
            logins.push(login_result?);
        }

        Ok(logins)
    }

    pub fn update(&mut self, id: &u32, name: &String, username: &String, password: &String, url: &String) -> Result<()> {
        self.conn.execute("
            update login set
                name = ?2,
                username = ?3,
                password = ?4,
                url = ?5
            where id = ?1",
  params![id, name, username, password, url])?;
        Ok(())
    }

    pub fn delete(&mut self, id: &u32) -> Result<()> {
        self.conn.execute("delete from login where id = :id", &[(":id", id)])?;
        Ok(())
    }
}