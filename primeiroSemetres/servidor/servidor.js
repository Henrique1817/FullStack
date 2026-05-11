// inclui o módulo http
var http = require("http");
// inclui o módulo express
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// cria a variável app, pela qual acessaremos
// os métodos / funções existentes no framework
// express
var app = express();

// armazenamento em memória dos usuários cadastrados (demonstração)
var usuarios = [];

// método use() utilizado para definir em qual
// pasta estará o conteúdo estático
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var publicPrimeiro = path.join(
  __dirname,
  "public",
  "primeiroSemetres"
);

// cria o servidor
var server = http.createServer(app);
server.listen(80, function () {
  console.log("servidor rodando na porta 80");
  console.log("http://localhost/primeiroSemetres/projects.html");
  console.log("http://localhost/cadastra  (Cadastro.html)");
  console.log("http://localhost/login     (Login.html)");
});

// Raiz: página de projetos
app.get("/", function (req, res) {
  res.redirect("/primeiroSemetres/projects.html");
});

// Cadastro.html servido em /cadastra
app.get("/cadastra", function (req, res) {
  res.sendFile(path.join(publicPrimeiro, "Cadastro.html"));
});

// Login.html servido em /login (GET exibe o formulário)
app.get("/login", function (req, res) {
  res.sendFile(path.join(publicPrimeiro, "Login.html"));
});

// Processa o formulário de cadastro (POST)
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

// Processa o login e exibe resposta.ejs com o status
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

app.get("/inicio", function (req, res) {
  var nome = req.query.info;
  console.log(nome);
});

app.post("/inicio", function (req, res) {
  var data = req.body.data;
  console.log(data);
});
