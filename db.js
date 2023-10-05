const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('./banco.db');

db.serialize(()=>{
    db.run(`create table if not exists tarefas(
        id integer primary key autoincrement,
        nome varchar(100)
        )`)
})

module.exports = db;