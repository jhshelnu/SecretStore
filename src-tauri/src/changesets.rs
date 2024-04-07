use lazy_static::lazy_static;
use crate::entity::changeset::Changeset;

lazy_static! {
    pub static ref CHANGESETS: Vec<Changeset> = vec![
        Changeset {
            id: 1,
            sql: String::from("
                create table login (
                    id integer primary key,
                    name text not null,
                    username text not null,
                    password text not null,
                    url text not null
                )
            ")
        },
        Changeset {
            id: 2,
            sql: String::from("
                alter table login add column favorite bool not null default false;
            ")
        },
        Changeset {
            id: 3,
            sql: String::from("
                alter table login add column archived bool not null default false;
            ")
        }
    ];
}