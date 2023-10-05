const express = require('express');
const db=require('./db')
const app = express();

app.use(express.json())

app.get('/ola', (req,res)=>{res.json({mensagem:'olá mundo'})})

app.get('/tarefas', (req,res)=>{
    db.all('select * from tarefas',(erro,tarefas)=>{
        if (erro!=null){
            console.error(erro); 
            res.status(500).json({mensagem: 'erro no servidor'})
        }
        else{res.json(tarefas)}
    })
      
});

app.post('/tarefas', (req, res) => {
    const nome = req.body.nome;
    db.run('insert into tarefas (nome) values (?)', [nome], (erro) => {
        if (erro != null) {
            res.status(500).json({mensagem: 'Deu erro'});
        } else {
            res.status(201).json({nome: nome})
        };
    });
});

app.listen(3030, () => {console.log('servidor executando em localhost:3030')});
