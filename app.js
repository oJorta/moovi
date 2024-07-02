// app.js
const express = require('express');
const app = express();
const path = require('path');
const conexao = require('./db'); // Certifique-se de que o caminho está correto

// Configura o EJS como engine de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsing de URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// (1) Consulta todos registros para home.ejs
app.get("/home", function (req, res) {
    const sql = "SELECT * FROM Filme";
    conexao.query(sql, [], function (err, rows) {
        if (err) {
            console.error("Erro no retorno da SELECT...", err);
            return res.status(500).send("Erro ao consultar o banco de dados.");
        }
        res.render("home", { dados: rows });
    });
});

app.listen(3000, () => {
    console.log('SERVIDOR ATIVO, ACESSE http://localhost:3000');
});

const bcrypt = require('bcrypt');

// Rota GET para exibir o formulário de cadastro e login
app.get("/", (req, res) => {
    res.render("login");
});

// Rota POST para processar o cadastro do cliente
app.post("/cadastro", async (req, res) => {
    const { email, telefone, pais, estado, logradouro, cep, username, password, nome } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        mySql.beginTransaction(err => {
            if (err) {
                return res.status(500).send("Erro ao iniciar a transação.");
            }

            // Inserir na tabela Contato
            const contatoQuery = "INSERT INTO Contato (Email, Telefone) VALUES (?, ?)";
            mySql.query(contatoQuery, [email, telefone], (err, contatoResult) => {
                if (err) {
                    return mySql.rollback(() => {
                        res.status(500).send("Erro ao inserir na tabela Contato.");
                    });
                }

                const contatoId = contatoResult.insertId;

                // Inserir na tabela Endereco
                const enderecoQuery = "INSERT INTO Endereco (Logradouro, FK_Estado, FK_Pais, CEP) VALUES (?, ?, ?, ?)";
                mySql.query(enderecoQuery, [logradouro, estado, pais, cep], (err, enderecoResult) => {
                    if (err) {
                        return mySql.rollback(() => {
                            res.status(500).send("Erro ao inserir na tabela Endereco.");
                        });
                    }

                    const enderecoId = enderecoResult.insertId;

                    // Inserir na tabela Usuario
                    const usuarioQuery = "INSERT INTO Usuario (Username, Password) VALUES (?, ?)";
                    mySql.query(usuarioQuery, [username, hashedPassword], (err, usuarioResult) => {
                        if (err) {
                            return mySql.rollback(() => {
                                res.status(500).send("Erro ao inserir na tabela Usuario.");
                            });
                        }

                        const usuarioId = usuarioResult.insertId;

                        // Inserir na tabela Cliente
                        const clienteQuery = "INSERT INTO Cliente (Nome, FK_Endereco, FK_Contato, UsuarioId) VALUES (?, ?, ?, ?)";
                        mySql.query(clienteQuery, [nome, enderecoId, contatoId, usuarioId], (err, clienteResult) => {
                            if (err) {
                                return mySql.rollback(() => {
                                    res.status(500).send("Erro ao inserir na tabela Cliente.");
                                });
                            }

                            mySql.commit(err => {
                                if (err) {
                                    return mySql.rollback(() => {
                                        res.status(500).send("Erro ao fazer commit da transação.");
                                    });
                                }
                                res.send("Cadastro realizado com sucesso!");
                            });
                        });
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).send("Erro ao processar o cadastro.");
    }
});

// Rota POST para processar o login do cliente
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM Usuario WHERE Email = ?";
    mySql.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao consultar o banco de dados.");
        }
        if (results.length === 0) {
            return res.status(401).send("Email ou senha incorretos.");
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.Password);

        if (match) {
            res.send("Login bem-sucedido!");
        } else {
            res.status(401).send("Email ou senha incorretos.");
        }
    });
});

app.listen(3000, () => {
    console.log('SERVIDOR ATIVO, ACESSE http://localhost:3000');
});