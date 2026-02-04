const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ROTA 1: Listar produtos (GET)
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos_caiodamasceno';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// ROTA 2: Cadastrar produtos (POST)
app.post('/produtos', (req, res) => {
    const { nome, descricao, preco } = req.body;
    const sql = 'INSERT INTO produtos_caiodamasceno (nome, descricao, preco) VALUES (?, ?, ?)';
    
    db.query(sql, [nome, descricao, preco], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Produto cadastrado com sucesso!', id: result.insertId });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});