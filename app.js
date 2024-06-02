const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Configurar o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Configurar o Express para usar EJS como mecanismo de visualização
app.set("view engine", "ejs");

// Conectar ao banco de dados SQLite
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('./Data.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite");
  }
});

app.use(express.urlencoded({ extended: false }));

// Rota para renderizar os dados
app.get("/", (req, res) => {
  const sql = "SELECT * FROM Filme";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).send("Erro ao executar a consulta");
    } else {
      res.render("home", { dados: rows });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port + ". Acesse: http://localhost:" + port);
});