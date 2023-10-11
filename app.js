const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM pokemon WHERE id = ?', [id], (erro, pokemon) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro no servidor' });
        }
        if (!pokemon) {
            return res.status(404).json({ mensagem: 'Pokémon não encontrado' });
        }
        res.json(pokemon);
    });
});

app.get('/pokemon', (req, res) => {
    db.all('select * from pokemon', (erro, pokemon) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro no servidor' });
        }
        res.json(pokemon);
    });
});

app.post('/pokemon', (req, res) => {
    const { nome, tipo } = req.body;
    db.run('insert into pokemon (nome, tipo) values (?, ?)', [nome, tipo], function(erro) {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao inserir' });
        }
        res.status(201).json({ nome, tipo });
    });
});

app.delete('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM pokemon WHERE id = ?', [id], function(erro) {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao deletar' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ mensagem: 'Pokémon não encontrado' });
        }
        res.status(200).json({ mensagem: 'Pokémon deletado com sucesso' });
    });
});

app.put('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    const { nome, tipo } = req.body;
    
    db.run('UPDATE pokemon SET nome = ?, tipo = ? WHERE id = ?', [nome, tipo, id], function(erro) {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao atualizar' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ mensagem: 'Pokémon não encontrado' });
        }
        res.status(200).json({ mensagem: 'Pokémon atualizado com sucesso' });
    });
});

app.listen(3030, () => {
    console.log('servidor executando em localhost:3030');
});

"CORS"