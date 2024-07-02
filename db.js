const mysql = require('mysql2');

// Elementos para conexao com MySQL
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'cinema',
    multipleStatements: true
});

// Executar conexao com BD
conexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL.');
    }
});

// Exporta módulo globalmente para rotas app.get() e app.post()
module.exports = conexao;
