const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('./pokemon.db');

db.serialize(()=>{
    db.run(`create table if not exists pokemon(
        id integer primary key autoincrement,
        nome varchar(100),
        tipo varchar(100)
        )`)
})

module.exports = db;