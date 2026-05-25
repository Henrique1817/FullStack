/**
 * Servidor WEB — Node.js + Express (LAB 7–10).
 * Porta 80, escuta em 0.0.0.0. LAB 8: GET/POST + EJS; '/' → projetos.
 * LAB 9: blog em /blog (EJS + SQLite).
 * LAB 10: venda de carros em /carros (EJS + SQLite, CRUD + venda).
 */

var http = require("http");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var blogDb = require("./blog-db");
var carrosDb = require("./carros-db");

var app = express();

var usuarios = [];

blogDb.initBlogDb();
carrosDb.initCarrosDb();

var publicDir = path.join(__dirname, "public");
var publicPrimeiro = path.join(publicDir, "primeiroSemetres");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret:
      process.env.CARROS_SESSION_SECRET ||
      "lab10-carros-sessao-dev-altere-em-producao",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(function (req, res, next) {
  res.locals.carrosLogado = !!(req.session && req.session.carrosUserId);
  next();
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function requireCarrosAuth(req, res, next) {
  if (req.session && req.session.carrosUserId) {
    return next();
  }
  res.redirect("/carros/usuario/login");
}

/* Raiz (LAB 8): direciona para a página de projetos */
app.get("/", function (req, res) {
  res.redirect("/primeiroSemetres/projects.html");
});

/** Enunciado (exemplo de acesso por IP): http://<SEU_IP>/Home.html */
app.get("/Home.html", function (req, res) {
  res.sendFile(path.join(publicPrimeiro, "index.html"));
});

/** Enunciado (exemplo): http://<SEU_IP>/Project.html */
app.get("/Project.html", function (req, res) {
  res.sendFile(path.join(publicPrimeiro, "projects.html"));
});

app.get("/cadastra", function (req, res) {
  res.sendFile(path.join(publicPrimeiro, "Cadastro.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(publicPrimeiro, "Login.html"));
});

app.post("/cadastra", function (req, res) {
  var nome = (req.body.nome || "").trim();
  var email = (req.body.email || "").trim().toLowerCase();
  var senha = req.body.senha || "";

  if (!nome || !email || !senha) {
    return res.status(400).render("resposta", {
      sucesso: false,
      titulo: "Cadastro incompleto",
      mensagem: "Preencha nome, e-mail e senha.",
      nomeUsuario: null,
    });
  }

  var existe = usuarios.some(function (u) {
    return u.email === email;
  });
  if (existe) {
    return res.status(400).render("resposta", {
      sucesso: false,
      titulo: "Cadastro",
      mensagem: "Este e-mail já está cadastrado.",
      nomeUsuario: null,
    });
  }

  usuarios.push({ nome: nome, email: email, senha: senha });
  res.redirect("/login");
});

app.post("/login", function (req, res) {
  var email = (req.body.email || "").trim().toLowerCase();
  var senha = req.body.senha || "";

  var user = usuarios.find(function (u) {
    return u.email === email && u.senha === senha;
  });

  if (user) {
    return res.render("resposta", {
      sucesso: true,
      titulo: "Login realizado com sucesso",
      mensagem: "Suas credenciais foram validadas.",
      nomeUsuario: user.nome,
    });
  }

  res.status(401).render("resposta", {
    sucesso: false,
    titulo: "Falha no login",
    mensagem: "E-mail ou senha incorretos. Verifique ou cadastre-se.",
    nomeUsuario: null,
  });
});

/** LAB 9 — Blog (EJS + SQLite): listar posts */
app.get("/blog", function (req, res) {
  var posts = blogDb.buscarTodosPosts();
  res.render("blog", { posts: posts });
});

/** LAB 9 — cadastrar post no BD e voltar ao blog */
app.post("/blog/post", function (req, res) {
  var titulo = (req.body.titulo || "").trim();
  var resumo = (req.body.resumo || "").trim();
  var conteudo = (req.body.conteudo || "").trim();

  if (!titulo || !resumo || !conteudo) {
    return res.status(400).send(
      "Preencha título, resumo e conteúdo. <a href='/primeiroSemetres/cadastrar_post.html'>Voltar</a>"
    );
  }

  blogDb.cadastrarPost(titulo, resumo, conteudo);
  res.redirect("/blog");
});

/* ---------- LAB 10 — Carros (EJS + SQLite, CRUD) ---------- */

app.get("/carros", function (req, res) {
  res.render("carros_hub", {});
});

app.get("/carros/usuario/cadastro", function (req, res) {
  res.render("carros_usuario_cadastro", { erro: null });
});

app.post("/carros/usuario/cadastro", function (req, res) {
  var nome = (req.body.nome || "").trim();
  var login = (req.body.login || "").trim();
  var senha = req.body.senha || "";

  if (!nome || !login || !senha) {
    return res.render("carros_usuario_cadastro", {
      erro: "Preencha nome, login e senha.",
    });
  }

  try {
    carrosDb.usuarioCriar(nome, login, senha);
  } catch (err) {
    var msg = "Não foi possível cadastrar.";
    if (err && err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      msg = "Este login já está em uso.";
    }
    return res.status(400).render("carros_usuario_cadastro", { erro: msg });
  }

  res.redirect("/carros/usuario/login");
});

app.get("/carros/usuario/login", function (req, res) {
  res.render("carros_usuario_login", { erro: null });
});

app.post("/carros/usuario/login", function (req, res) {
  var login = (req.body.login || "").trim();
  var senha = req.body.senha || "";

  var user = carrosDb.usuarioPorLogin(login);
  if (!user || user.senha !== senha) {
    return res.status(401).render("carros_usuario_login", {
      erro: "Login ou senha incorretos.",
    });
  }

  req.session.carrosUserId = user.id;
  req.session.carrosUserNome = user.nome;
  res.redirect("/carros/gerencia");
});

app.post("/carros/logout", function (req, res) {
  req.session.destroy(function () {
    res.redirect("/carros");
  });
});

app.get("/carros/listagem", function (req, res) {
  res.render("carros_listagem", { carros: carrosDb.carroListarTodos() });
});

app.get("/carros/gerencia", requireCarrosAuth, function (req, res) {
  var usuario = carrosDb.usuarioPorId(req.session.carrosUserId);
  res.render("carros_gerencia", {
    carros: carrosDb.carroListarTodos(),
    usuarioNome: usuario ? usuario.nome : "",
    aviso: req.query.aviso || null,
  });
});

app.get("/carros/novo", requireCarrosAuth, function (req, res) {
  res.render("carros_carro_novo", {});
});

app.post("/carros/novo", requireCarrosAuth, function (req, res) {
  var marca = (req.body.marca || "").trim();
  var modelo = (req.body.modelo || "").trim();
  var ano = parseInt(req.body.ano, 10);
  var qtde = parseInt(req.body.qtde_disponivel, 10);

  if (!marca || !modelo || !Number.isFinite(ano) || !Number.isFinite(qtde)) {
    return res.status(400).send(
      "Dados inválidos. <a href='/carros/novo'>Voltar</a>"
    );
  }

  carrosDb.carroCriar(marca, modelo, ano, Math.max(0, qtde));
  res.redirect("/carros/gerencia");
});

app.get("/carros/editar/:id", requireCarrosAuth, function (req, res) {
  var id = parseInt(req.params.id, 10);
  var carro = Number.isFinite(id) ? carrosDb.carroPorId(id) : null;
  res.render("carros_carro_editar", { carro: carro });
});

app.post("/carros/editar/:id", requireCarrosAuth, function (req, res) {
  var id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id) || !carrosDb.carroPorId(id)) {
    return res.redirect("/carros/gerencia");
  }

  var marca = (req.body.marca || "").trim();
  var modelo = (req.body.modelo || "").trim();
  var ano = parseInt(req.body.ano, 10);
  var qtde = parseInt(req.body.qtde_disponivel, 10);

  if (!marca || !modelo || !Number.isFinite(ano) || !Number.isFinite(qtde)) {
    return res.status(400).send(
      "Dados inválidos. <a href='/carros/editar/" + id + "'>Voltar</a>"
    );
  }

  carrosDb.carroAtualizar(id, marca, modelo, ano, Math.max(0, qtde));
  res.redirect("/carros/gerencia");
});

app.post("/carros/remover/:id", requireCarrosAuth, function (req, res) {
  var id = parseInt(req.params.id, 10);
  if (Number.isFinite(id)) {
    carrosDb.carroRemover(id);
  }
  res.redirect("/carros/gerencia");
});

app.post("/carros/vender/:id", requireCarrosAuth, function (req, res) {
  var id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) {
    return res.redirect("/carros/gerencia");
  }

  var r = carrosDb.carroVender(id);
  if (!r.ok && r.motivo === "ja_zero") {
    return res.redirect("/carros/gerencia?aviso=ja_esgotado");
  }
  if (!r.ok && r.motivo === "nao_encontrado") {
    return res.redirect("/carros/gerencia");
  }
  if (r.esgotado) {
    return res.redirect("/carros/gerencia?aviso=esgotado");
  }
  res.redirect("/carros/gerencia");
});

app.get("/inicio", function (req, res) {
  var nome = req.query.info;
  console.log(nome);
});

app.post("/inicio", function (req, res) {
  var data = req.body.data;
  console.log(data);
});

/**
 * Todo o conteúdo em public/ fica disponível (labs, guess.html, Canvas.html, etc.).
 * Ex.: http://<SEU_IP>/primeiroSemetres/guess.html
 */
app.use(express.static(publicDir));

var server = http.createServer(app);

var PORT = 80;
var HOST = "0.0.0.0";

server.listen(PORT, HOST, function () {
  console.log("");
  console.log("Servidor Express na porta " + PORT + " (host " + HOST + ").");
  console.log("  Local:   http://localhost/");
  console.log("  Na rede: http://<SEU_IP>/   (IPv4 em ipconfig /all)");
  console.log("");
  console.log("Exemplos do enunciado:");
  console.log("  http://<SEU_IP>/Home.html");
  console.log("  http://<SEU_IP>/Project.html");
  console.log("");
  console.log("  Raiz (LAB 8): http://localhost/ → projects.html");
  console.log("  Portal:     http://localhost/Home.html");
  console.log("  Blog LAB 9: http://localhost/blog");
  console.log("  Carros LAB 10: http://localhost/carros");
  console.log("");
});
