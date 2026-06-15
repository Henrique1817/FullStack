var http = require("http");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var blogDb = require("./blog-db");

var app = express();


blogDb.initBlogDb();

var publicDir = path.join(__dirname, "public");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/lembrete", function (req, res) {
  var posts = blogDb.buscarTodosPosts();
  res.render("lembrete", { posts: posts });
});

app.post("/lembrete/post", function (req, res) {
  var titulo = (req.body.titulo || "").trim();
  var resumo = (req.body.resumo || "").trim();
  var conteudo = (req.body.conteudo || "").trim();
  var local = (req.body.local || "").trim();
  var data = (req.body.data || "").trim();
  var hora = (req.body.hora || "").trim();

  if (!titulo || !resumo || !conteudo) {
    return res.status(400).send(
      "Preencha todos os campos. <a href='/cadastrar_lembrete.html'>Voltar</a>"
    );
  }

  blogDb.cadastrarPost(titulo, resumo, local, data, hora);
  res.redirect("/lembrete");
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
  console.log(" Lembretes: http://localhost/lembrete");
  console.log("");
});
