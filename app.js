const express = require("express");
const app = express();
const mySql = require('./db.js');

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// (1) Consulta todos registros
app.get("/home", function (req, res) {
    const sql = "SELECT Filme.*, Genero.Nome AS Genero FROM Filme JOIN Genero ON Filme.FK_Genero = Genero.Id LEFT JOIN Aluguel ON Filme.Id = Aluguel.FK_Filme AND Aluguel.Vigente = true WHERE Aluguel.Id IS NULL OR Aluguel.Vigente = false";
    mySql.query(sql, [], function (err, rows) {
        if (err) {
            console.error("Erro no retorno da SELECT...", err);
            return res.status(500).send("Erro ao consultar o banco de dados.");
        }
        res.render("home", { dados: rows });
    });
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
                    mySql.query(usuarioQuery, [username, password], (err, usuarioResult) => {
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
                                
                                // Envie uma resposta de sucesso para o AJAX
                                res.json({ message: "Cadastro realizado com sucesso!" });
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

let idCliente = 0

// Rota POST para processar o login do cliente
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Consulta para verificar as credenciais do usuário
    const query = "SELECT Id, Username FROM Usuario WHERE Username = ? AND Password = ?";
    mySql.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao consultar o banco de dados.");
        }
        if (results.length === 0) {
            return res.status(401).send("Nome de usuário ou senha incorretos.");
        }

        const user = results[0];
        const userId = user.Id;
        idCliente = user.Id;
        // Verifica se o usuário é administrador
        const checkAdminSql = "SELECT 1 FROM Admin WHERE UsuarioId = ?";
        mySql.query(checkAdminSql, [userId], (err, result) => {
            if (err) {
                console.error('Erro ao verificar admin:', err);
                return res.status(500).json({ success: false, message: 'Erro ao verificar admin' });
            }

            const isAdmin = result.length > 0;

            // Retorna a resposta de login com o status de administrador
            res.json({
                success: true,
                userId: user.Id,
                username: user.Username,
                isAdmin: isAdmin
            });
        });
    });
});

app.get("/search", (req, res) => {
    const sql = "SELECT Filme.*, Genero.Nome AS Genero FROM Filme JOIN Genero ON Filme.FK_Genero = Genero.Id LEFT JOIN Aluguel ON Filme.Id = Aluguel.FK_Filme AND Aluguel.Vigente = true WHERE Aluguel.Id IS NULL OR Aluguel.Vigente = false";
    mySql.query(sql, [], function (err, rows) {
        if (err) {
            console.error("Erro no retorno da SELECT...", err);
            return res.status(500).send("Erro ao consultar o banco de dados.");
        }
        res.render("search", { dados: rows });
    });
});

app.get("/admin", (req, res) => {
    const sql = "SELECT * FROM Filme";
    mySql.query(sql, [], function (err, rows) {
        if (err) {
            console.error("Erro no retorno da SELECT...", err);
            return res.status(500).send("Erro ao consultar o banco de dados.");
        }
        res.render("admin", { dados: rows });
    });
});

app.delete('/delete/:id', (req, res) => {
    const movieId = req.params.id;

    // Remover os registros de aluguel relacionados ao filme
    const deleteAluguelSql = 'DELETE FROM Aluguel WHERE FK_Filme = ?';
    mySql.query(deleteAluguelSql, [movieId], (err, result) => {
        if (err) {
            console.error('Erro ao deletar registros de aluguel:', err);
            return res.status(500).json({ success: false, message: 'Erro ao deletar registros de aluguel' });
        }

        // Agora podemos prosseguir com a exclusão do filme
        const deleteFilmeSql = 'DELETE FROM Filme WHERE Id = ?';
        mySql.query(deleteFilmeSql, [movieId], (err, result) => {
            if (err) {
                console.error('Erro ao deletar filme:', err);
                return res.status(500).json({ success: false, message: 'Erro ao deletar filme' });
            }

            res.json({ success: true, message: 'Filme deletado com sucesso.' });
        });
    });
});

// Rota GET para buscar filmes com base nos filtros
app.get('/search2', (req, res) => {
    const searchTerm = req.query.searchTerm || ''; // termo de pesquisa, opcional
    const minDuration = req.query.minDuration || 0; // duração mínima, opcional
    const maxDuration = req.query.maxDuration || 999; // duração máxima, opcional
    const releaseYear = req.query.releaseYear || ''; // ano de lançamento, opcional
    const genre = req.query.genre || ''; // gênero, opcional
    const sortBy = req.query.sortBy || 'Nome'; // ordenar por, padrão é nome
    const orderBy = req.query.orderBy || 'ASC'; // ordem, padrão é ascendente

    let sql = `
        SELECT Filme.*, Genero.Nome AS Genero 
        FROM Filme 
        JOIN Genero ON Filme.FK_Genero = Genero.Id 
        WHERE Filme.Nome LIKE ? 
        AND Filme.Duracao >= ? 
        AND Filme.Duracao <= ? 
        AND YEAR(Filme.DataLancamento) LIKE ? 
        AND Genero.id LIKE ? 
        ORDER BY ${sortBy} ${orderBy}
    `;

    // Valores para substituir na consulta SQL
    const values = [
        `%${searchTerm}%`,
        minDuration,
        maxDuration,
        `%${releaseYear}%`,
        `%${genre}%`
    ];

    console.log(sql)

    mySql.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao buscar filmes:', err);
            res.status(500).json({ error: 'Erro ao buscar filmes' });
            return;
        }
        res.json(results); // Envia os resultados como resposta em formato JSON
    });
});

app.get("/adicionar", (req, res) => {
    res.render("adicionar");
});

const multer = require('multer');
const path = require('path');

// Configuração do Multer para salvar o poster na pasta public/Posters
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Posters/');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.titulo + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/cadastro2', upload.single('Poster'), (req, res) => {
    const { Nome, Sinopse, Duracao, DataLancamento, Diretor, Produtora } = req.body;
    const Poster = `/Posters/${req.file.filename}`; // Caminho do poster relativo à pasta public
    const FK_Genero = req.body.FK_Genero; // Certifique-se de que este campo é passado corretamente no formulário

    const insertSql = 'INSERT INTO Filme (Nome, Sinopse, Duracao, DataLancamento, Diretor, Produtora, Poster, FK_Genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    mySql.query(insertSql, [Nome, Sinopse, Duracao, DataLancamento, Diretor, Produtora, Poster, FK_Genero], (err, result) => {
        if (err) {
            console.error('Erro ao inserir filme:', err);
            return res.status(500).json({ success: false, message: 'Erro ao inserir filme' });
        }

        res.json({ success: true, message: 'Filme adicionado com sucesso' });
    });
});

app.listen(3000, () => {
    console.log('SERVIDOR ATIVO, ACESSE http://localhost:3000');
});


app.get("/alugados", (req, res) => {
    const userId = idCliente; // Supondo que 'userId' foi armazenado corretamente após o login
    console.log(userId)
    // Consulta para obter o ID do Cliente com base no ID do Usuário
    const clienteSql = `
        SELECT Id
        FROM Cliente
        WHERE UsuarioId = ?
    `;

    mySql.query(clienteSql, [userId], (err, clienteResult) => {
        if (err) {
            console.error("Erro ao buscar ID do cliente:", err);
            return res.status(500).send("Erro ao consultar o banco de dados.");
        }

        if (clienteResult.length === 0) {
            console.error("Cliente não encontrado para o usuário com ID:", userId);
            return res.status(404).send("Cliente não encontrado.");
        }

        const clienteId = clienteResult[0].Id;
        console.log(clienteId)
        // Consulta para obter os filmes alugados pelo cliente
        const filmesSql = `
            SELECT Filme.*, Genero.Nome AS Genero 
            FROM Filme 
            JOIN Genero ON Filme.FK_Genero = Genero.Id 
            JOIN Aluguel ON Filme.Id = Aluguel.FK_Filme 
            WHERE Aluguel.FK_Cliente = ? AND Aluguel.Vigente = true
        `;

        mySql.query(filmesSql, [clienteId], (err, rows) => {
            if (err) {
                console.error("Erro ao retornar SELECT de filmes alugados:", err);
                return res.status(500).send("Erro ao consultar o banco de dados.");
            }
            res.render("alugados", { dados: rows });
        });
    });
});
