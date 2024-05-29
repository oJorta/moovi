let express = require("express");
let app = express();
const port = process.env.PORT || 3000;

// Configurar o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Configurar o Express para usar EJS como mecanismo de visualização
app.set("view engine", "ejs");

// Definir a rota raiz
app.get("/", function(req, res){
    var dados = "CURSO JAVASCRIPT E SQL";
    console.log(dados);
    res.render("home", { dados: dados }); // Renderizar o arquivo home.ejs
});

// Iniciar o servidor
app.listen(port, () => {
    console.log("Servidor na porta 3000. Acesse: http://localhost:" + port);
});