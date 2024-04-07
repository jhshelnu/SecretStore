use std::collections::HashSet;
use std::path::Path;
use anyhow::{anyhow, Result};
use rusqlite::{Connection, DatabaseName, OpenFlags, params, Statement};
use crate::changesets::CHANGESETS;
use crate::entity::login::Login;

#[derive(Debug)]
pub struct SecretStore {
    conn: Connection
}

impl SecretStore {
    pub fn new(file_path: &str, password: &str) -> Result<Self> {
        if Path::new(&file_path).is_file() {
            return Err(anyhow!("A file already exists at the specified file path. Try renaming the existing file or rerunning without '--create'"));
        }

        let mut conn = Connection::open_with_flags(file_path, OpenFlags::default())?;
        conn.pragma_update(Some(DatabaseName::Main), "key", password)?;
        Self::init_db_schema(&mut conn)?;
        Self::update_db_schema(&mut conn)?;
        Ok(Self { conn })
    }

    pub fn from_file(file_path: &str, password: &str) -> Result<Self> {
        if !Path::new(&file_path).is_file() {
            return Err(anyhow!("No SecretStore file found at the specified file path. Try a different file path or rerunning with '--create'"));
        }

        let mut conn = Connection::open_with_flags(file_path, OpenFlags::default() & !OpenFlags::SQLITE_OPEN_CREATE)?;
        conn.pragma_update(Some(DatabaseName::Main), "key", password)?;
        let _ = conn.prepare("select 1 from login limit 1")?.query([])?; // will throw if the file + password combination is wrong
        Self::update_db_schema(&mut conn)?;
        Ok(Self { conn })
    }

    fn init_db_schema(conn: &mut Connection) -> Result<()> {
        conn.execute("create table changelog (
            id integer primary key
        )", ())?;
        Ok(())
    }

    fn update_db_schema(conn: &mut Connection) -> Result<()> {
        let mut stmt = conn.prepare("select id from changelog")?;

        let ids_executed: HashSet<u32> = stmt
            .query_map([], |row| row.get(0))?
            .map(|id| id.unwrap())
            .collect();

        drop(stmt);

        for changeset in CHANGESETS.iter().filter(|changeset| !ids_executed.contains(&changeset.id)) {
            let tx = conn.transaction()?;
            tx.execute(&changeset.sql, ())?;
            tx.execute("insert into changelog (id) values (:id)", &[(":id", &changeset.id)])?;
            tx.commit()?;
        }

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

    pub fn get_all(&self) -> Result<Vec<Login>> {
        let mut stmt = self.conn.prepare("select * from login where not archived")?;
        Self::get_and_map(&mut stmt)
    }

    pub fn get_favorites(&self) -> Result<Vec<Login>> {
        let mut stmt = self.conn.prepare("select * from login where favorite")?;
        Self::get_and_map(&mut stmt)
    }

    pub fn get_archived(&self) -> Result<Vec<Login>> {
        let mut stmt = self.conn.prepare("select * from login where archived")?;
        Self::get_and_map(&mut stmt)
    }

    pub fn update(&mut self, login: &Login) -> Result<()> {
        self.conn.execute("
            update login set
                name = ?2,
                username = ?3,
                password = ?4,
                url = ?5,
                favorite = ?6,
                archived = ?7
            where id = ?1",
  params![login.id, login.name, login.username, login.password, login.url, login.favorite, login.archived])?;
        Ok(())
    }

    pub fn delete(&mut self, id: &u32) -> Result<()> {
        self.conn.execute("delete from login where id = :id", &[(":id", id)])?;
        Ok(())
    }

    fn get_and_map(stmt: &mut Statement) -> Result<Vec<Login>> {
        let login_results = stmt.query_map([], |row|
            Ok(Login {
                id:       row.get(0)?,
                name:     row.get(1)?,
                username: row.get(2)?,
                password: row.get(3)?,
                url:      row.get(4)?,
                favorite: row.get(5)?,
                archived: row.get(6)?,
            })
        )?;

        let mut logins = Vec::new();
        for login_result in login_results {
            logins.push(login_result?);
        }

        Ok(logins)
    }
}