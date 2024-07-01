const express = require("express");
const app = express();
const mySql = require('./db.js');
app.use(express.urlencoded({extended: false}));
app.set("engine ejs", "ejs");
// (1)consulta todos regitros para index.ejs
app.get("/", function (req, res) {
const sql = "SELECT * FROM Filme";
mySql.query(sql, [], function (err, rows) {
    if (err) {
        return console.error("Erro no retorno da SELECT...");
    }
        res.render("index.ejs", { dados: rows });
    });
});
app.listen(3000, () => {
  console.log('SERVIDOR ATIVO, ACESSE http://localhost:3000');
});


// // Rota para renderizar a página inicial com os dados do banco de dados
// app.get("/", (req, res) => {
//   const sql = "SELECT * FROM Filme";
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       console.error("Erro ao executar a consulta:", err.message);
//       res.status(500).send("Erro ao executar a consulta");
//     } else {
//       res.render("home", { dados: rows });
//     }
//   });
// });

// // Rota para renderizar a página de login
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// // Rota para renderizar a página de pesquisa
// app.get("/search", (req, res) => {
//   res.render("search");
// });

// // Rota para renderizar a página de admin
// app.get("/admin", (req, res) => {
//   const sql = "SELECT * FROM Filme";
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       console.error("Erro ao executar a consulta:", err.message);
//       res.status(500).send("Erro ao executar a consulta");
//     } else {
//       res.render("admin", { dados: rows });
//     }
//   });
// });

// // Iniciar o servidor
// app.listen(port, () => {
//   console.log("Servidor rodando na porta " + port + ". Acesse: http://localhost:" + port);
// });

