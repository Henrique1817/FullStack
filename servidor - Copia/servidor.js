// require("colors");
// var http = require("http");
// var express = require("express");
// var bodyParser = require("body-parser");
// var mongodb = require("mongodb");

// const MongoClient = mongodb.MongoClient;
// const uri = 'mongodb+srv://Mathregio:math281207M@cluster0.0pth8ig.mongodb.net/?appName=Cluster0';
// const client = new MongoClient(uri, { useNewUrlParser: true });

// var app = express();
// app.use(express.static("./public"));
// app.use(bodyParser.urlencoded({extended: false }));
// app.use(bodyParser.json());
// app.set('view engine', 'ejs');
// app.set('views', './views');

// var server = http.createServer(app);
// server.listen(80);

// console.log("Servidor rodando...".rainbow);
// console.log("http://localhost:80/lab1_lab2/projetos.html")
// console.log("http://localhost:80/blog.ejs")

// var dbo = client.db("exemplo_bd");
// var posts_blog = dbo.collection("posts");

// // Redireciona a raiz para projects.html
// app.get('/', function(req, resp) {
//     resp.redirect('lab1_lab2/projetos.html');
// });

// // Rota para ver os posts (Feed)
// /* app.get('/blog', function(req, resp) {
//     posts_blog.find({}).toArray(function(err, itens) {
//         if (err) {
//             resp.render('blog', { lista_posts: [] });
//         } else {
//             resp.render('blog', { lista_posts: itens });
//         }
//     });
// });
//  */
// app.get('/blog', async (req, resp) => {
//             try {
//                 const itens = await posts_blog.find({}).toArray();
//                 // 'blog' refere-se a ./views/blog.ejs (o Express completa o caminho)
//                 resp.render('blog', { lista_posts: itens });
//             } catch (err) {
//                 console.error("Erro ao buscar posts:", err);
//                 resp.render('blog', { lista_posts: [] });
//             }
//         });

// // Rota para salvar e redirecionar para o feed
// app.post('/lab9/criarPost', function(req, resp) {
//     var novoPost = { 
//         titulo: req.body.titulo, 
//         resumo: req.body.resumo, 
//         conteudo: req.body.conteudo 
//     };

//     posts_blog.insertOne(novoPost, function (err) {
//         if (err) {
//             resp.send("Erro ao salvar o post.");
//         } else {
//             resp.redirect('/blog');
//         }
//     });
// });

// Configurações do Express
require("colors");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const publicRoot = path.join(__dirname, "public");
const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://Mathregio:math281207M@cluster0.0pth8ig.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

// Configurações do Express
app.use(express.static(publicRoot));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

async function iniciarServidor() {
    try {
        // 1. Conectar ao Banco de Dados
        await client.connect();
        const dbo = client.db("exemplo_bd");
        const posts_blog = dbo.collection("posts");
        const usuarios = dbo.collection("usuarios");
        const carros = dbo.collection("carros");
        console.log("Conectado ao MongoDB!".green);

        // --- ROTAS ---

        // Redireciona a raiz para a página estática de projetos
        app.get("/", (req, resp) => {
            resp.redirect("/lab1_lab2/projetos.html");
        });

        // Link antigo do template do blog
        app.get("/criarPost.html", (req, resp) => {
            resp.redirect("/lab9/criarPost.html");
        });

        // ROTA DO BLOG (O jeito certo)
        // URL: http://localhost/blog
        app.get('/blog', async (req, resp) => {
            try {
                const itens = await posts_blog.find({}).toArray();
                // 'blog' refere-se a ./views/blog.ejs (o Express completa o caminho)
                resp.render('blog', { lista_posts: itens });
            } catch (err) {
                console.error("Erro ao buscar posts:", err);
                resp.render('blog', { lista_posts: [] });
            }
        });

        // ROTA PARA CRIAR POST
        app.post('/lab9/criarPost', async (req, resp) => {
            const novoPost = { 
                titulo: req.body.titulo, 
                resumo: req.body.resumo, 
                conteudo: req.body.conteudo 
            };

            try {
                await posts_blog.insertOne(novoPost);
                // Após salvar, redirecionamos para a URL do feed, não para o arquivo
                resp.redirect('/blog');
            } catch (err) {
                resp.status(500).send("Erro ao salvar o post.");
            }
        });
            // ── ROTAS DE CADASTRO E LOGIN (LAB 8 estático + LAB 10 carros) ──

            // LAB 8: formulário com e-mail (public/lab8/Cadastro.html)
            app.get("/cadastra", (req, resp) => {
                resp.sendFile(path.join(publicRoot, "lab8", "Cadastro.html"));
            });

            // LAB 8: login com e-mail
            app.get("/login", (req, resp) => {
                resp.sendFile(path.join(publicRoot, "lab8", "Login.html"));
            });

            // LAB 10: login com campo "login" (não confundir com o LAB 8)
            app.get("/loginCarros", (req, resp) => {
                resp.sendFile(path.join(publicRoot, "lab10", "loginUsuario.html"));
            });

            app.get("/cadastroUsuario", (req, resp) => {
                resp.sendFile(path.join(publicRoot, "lab10", "cadastroUsuario.html"));
            });

            // POST '/cadastrar' — LAB 10: nome+login+senha | LAB 8: nome+email+senha (email vira login no BD)
            app.post("/cadastrar", async (req, resp) => {
                const loginOuEmail = (
                    req.body.login ||
                    req.body.email ||
                    ""
                ).trim();
                const novoUsuario = {
                    nome: (req.body.nome || "").trim(),
                    login: loginOuEmail,
                    senha: req.body.senha || "",
                };
                try {
                    const colUsuarios = dbo.collection("usuarios");
                    await colUsuarios.insertOne(novoUsuario);
                    if (req.body.login) {
                        resp.redirect("/loginCarros");
                    } else {
                        resp.redirect("/login");
                    }
                } catch (err) {
                    resp.status(500).send("Erro ao cadastrar usuário.");
                }
            });

            // POST '/login' — aceita login (LAB 10) ou email (LAB 8)
            app.post("/login", async (req, resp) => {
                const ident = (
                    req.body.login ||
                    req.body.email ||
                    ""
                ).trim();
                const senha = req.body.senha || "";
                try {
                    const colUsuarios = dbo.collection("usuarios");
                    const usuario = await colUsuarios.findOne({
                        login: ident,
                        senha: senha,
                    });
                    if (usuario) {
                        resp.render("resposta lab8", {
                            sucesso: true,
                            nome: usuario.nome,
                        });
                    } else {
                        resp.render("resposta lab8", {
                            sucesso: false,
                            nome: "",
                        });
                    }
                } catch (err) {
                    resp.status(500).send("Erro ao fazer login.");
                }
            });
            // GET /carros → listagem de carros
            app.get("/carros", async (req, resp) => {
                try {
                    const lista = await carros.find({}).toArray();
                    resp.render("carros", { carros: lista });
                } catch (err) {
                    resp.render("carros", { carros: [] });
                }
            });

            // GET /gerenciar → gerência de carros
            app.get("/gerenciar", async (req, resp) => {
                try {
                    const lista = await carros.find({}).toArray();
                    resp.render("gerenciar", { carros: lista });
                } catch (err) {
                    resp.render("gerenciar", { carros: [] });
                }
            });

            // GET /cadastroCarro → formulário de cadastro (LAB 10)
            app.get("/cadastroCarro", (req, resp) => {
                resp.sendFile(path.join(publicRoot, "lab10", "cadastroCarro.html"));
            });

            // POST /cadastrarCarro → CREATE
            app.post("/cadastrarCarro", async (req, resp) => {
                const novoCarro = {
                    marca: req.body.marca,
                    modelo: req.body.modelo,
                    ano: parseInt(req.body.ano, 10),
                    qtde_disponivel: parseInt(req.body.qtde_disponivel, 10),
                };
                try {
                    await carros.insertOne(novoCarro);
                    resp.redirect("/gerenciar");
                } catch (err) {
                    resp.status(500).send("Erro ao cadastrar carro.");
                }
            });

            // GET /editarCarro/:id → READ carro para editar
            app.get("/editarCarro/:id", async (req, resp) => {
                try {
                    const carro = await carros.findOne({
                        _id: new ObjectId(req.params.id),
                    });
                    if (!carro) {
                        return resp.status(404).send("Carro não encontrado.");
                    }
                    resp.render("editarCarro", { carro: carro });
                } catch (err) {
                    resp.status(500).send("Erro ao buscar carro.");
                }
            });

            // POST /atualizarCarro → UPDATE
            app.post("/atualizarCarro", async (req, resp) => {
                try {
                    await carros.updateOne(
                        { _id: new ObjectId(req.body.id) },
                        {
                            $set: {
                                marca: req.body.marca,
                                modelo: req.body.modelo,
                                ano: parseInt(req.body.ano, 10),
                                qtde_disponivel: parseInt(
                                    req.body.qtde_disponivel,
                                    10
                                ),
                            },
                        }
                    );
                    resp.redirect("/gerenciar");
                } catch (err) {
                    resp.status(500).send("Erro ao atualizar carro.");
                }
            });

            // POST /venderCarro → UPDATE decrementa quantidade
            app.post("/venderCarro", async (req, resp) => {
                try {
                    await carros.updateOne(
                        {
                            _id: new ObjectId(req.body.id),
                            qtde_disponivel: { $gt: 0 },
                        },
                        { $inc: { qtde_disponivel: -1 } }
                    );
                    resp.redirect("/gerenciar");
                } catch (err) {
                    resp.status(500).send("Erro ao vender carro.");
                }
            });

            // POST /removerCarro → DELETE
            app.post("/removerCarro", async (req, resp) => {
                try {
                    await carros.deleteOne({ _id: new ObjectId(req.body.id) });
                    resp.redirect("/gerenciar");
                } catch (err) {
                    resp.status(500).send("Erro ao remover carro.");
                }
            });
        // Iniciar o servidor de fato
        app.listen(80, () => {
            console.log("Servidor rodando em http://localhost:80".rainbow);
        });

    } catch (e) {
        console.error("Erro crítico ao iniciar:", e);
    }
}

iniciarServidor();