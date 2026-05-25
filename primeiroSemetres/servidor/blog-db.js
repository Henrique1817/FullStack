/**
 * LAB 9 — Acesso ao BD (SQLite): criar post e listar todos.
 */
var fs = require("fs");
var path = require("path");
var Database = require("better-sqlite3");

var dbPath = path.join(__dirname, "data", "blog.sqlite");
var db = null;

function initBlogDb() {
  var dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  db = new Database(dbPath);
  db.exec(
    "CREATE TABLE IF NOT EXISTS posts (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "titulo TEXT NOT NULL," +
      "resumo TEXT," +
      "conteudo TEXT," +
      "criado_em TEXT DEFAULT (datetime('now'))" +
      ")"
  );
}

/**
 * Cadastra um novo post no banco de dados.
 */
function cadastrarPost(titulo, resumo, conteudo) {
  var stmt = db.prepare(
    "INSERT INTO posts (titulo, resumo, conteudo) VALUES (?, ?, ?)"
  );
  return stmt.run(titulo, resumo, conteudo);
}

/**
 * Busca todos os posts no banco de dados (mais recentes primeiro).
 */
function buscarTodosPosts() {
  return db
    .prepare("SELECT id, titulo, resumo, conteudo, criado_em FROM posts ORDER BY id DESC")
    .all();
}

module.exports = {
  initBlogDb: initBlogDb,
  cadastrarPost: cadastrarPost,
  buscarTodosPosts: buscarTodosPosts,
};
