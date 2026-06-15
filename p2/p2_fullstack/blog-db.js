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
      "local TEXT," +
      "data DATE," +
      "hora DATETIME," +
      "criado_em TEXT DEFAULT (datetime('now'))" +
      ")"
  );

  var colunas = db.prepare("PRAGMA table_info(posts)").all();
  var temCriadoEm = colunas.some(function (c) {
    return c.name === "criado_em";
  });
  if (!temCriadoEm) {
    db.exec("ALTER TABLE posts ADD COLUMN criado_em TEXT");
    db.exec(
      "UPDATE posts SET criado_em = datetime('now') WHERE criado_em IS NULL"
    );
  }
}

/**
 * Cadastra um novo post no banco de dados.
 */
function cadastrarPost(titulo, resumo, local, data, hora) {
  var stmt = db.prepare(
    "INSERT INTO posts (titulo, resumo, local, data, hora) VALUES (?, ?, ?, ?, ?)"
  );
  return stmt.run(titulo, resumo, local, data, hora);
}

/**
 * Busca todos os posts no banco de dados (mais recentes primeiro).
 */
function buscarTodosPosts() {
  return db
    .prepare("SELECT id, titulo, resumo, local, data, hora, criado_em FROM posts ORDER BY id DESC")
    .all();
}

module.exports = {
  initBlogDb: initBlogDb,
  cadastrarPost: cadastrarPost,
  buscarTodosPosts: buscarTodosPosts,
};
