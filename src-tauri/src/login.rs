use std::fmt;
use std::fmt::{Display, Formatter};

pub struct Login {
    pub id: u32,
    pub name: String,
    pub username: String,
    pub password: String,
    pub url: String,
}

impl Display for Login {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        write!(f, "[{}] {}: {} / {} ({})", self.id, self.name, self.username, self.password, self.url)
    }
}