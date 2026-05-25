/**
 * LAB 10 — SQLite: coleções Usuarios (Nome, Login, Senha) e Carros (Marca, Modelo, Ano, Qtde_disponivel).
 * CRUD completo em JavaScript.
 */
var fs = require("fs");
var path = require("path");
var Database = require("better-sqlite3");

var dbPath = path.join(__dirname, "data", "carros.sqlite");
var db = null;

function initCarrosDb() {
  var dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  db = new Database(dbPath);
  db.exec(
    "CREATE TABLE IF NOT EXISTS usuarios (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "nome TEXT NOT NULL," +
      "login TEXT NOT NULL UNIQUE," +
      "senha TEXT NOT NULL" +
      ")"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS carros (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "marca TEXT NOT NULL," +
      "modelo TEXT NOT NULL," +
      "ano INTEGER NOT NULL," +
      "qtde_disponivel INTEGER NOT NULL DEFAULT 0" +
      ")"
  );
}

/* ---------- Usuarios CRUD ---------- */
function usuarioCriar(nome, login, senha) {
  var stmt = db.prepare(
    "INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)"
  );
  return stmt.run(nome, login, senha);
}

function usuarioPorLogin(login) {
  return db.prepare("SELECT * FROM usuarios WHERE login = ?").get(login);
}

function usuarioPorId(id) {
  return db.prepare("SELECT id, nome, login FROM usuarios WHERE id = ?").get(id);
}

function usuarioListar() {
  return db.prepare("SELECT id, nome, login FROM usuarios ORDER BY id").all();
}

function usuarioAtualizar(id, nome, login, senha) {
  if (senha) {
    return db
      .prepare(
        "UPDATE usuarios SET nome = ?, login = ?, senha = ? WHERE id = ?"
      )
      .run(nome, login, senha, id);
  }
  return db
    .prepare("UPDATE usuarios SET nome = ?, login = ? WHERE id = ?")
    .run(nome, login, id);
}

function usuarioRemover(id) {
  return db.prepare("DELETE FROM usuarios WHERE id = ?").run(id);
}

/* ---------- Carros CRUD ---------- */
function carroCriar(marca, modelo, ano, qtde) {
  var stmt = db.prepare(
    "INSERT INTO carros (marca, modelo, ano, qtde_disponivel) VALUES (?, ?, ?, ?)"
  );
  return stmt.run(marca, modelo, ano, qtde);
}

function carroListarTodos() {
  return db
    .prepare(
      "SELECT id, marca, modelo, ano, qtde_disponivel FROM carros ORDER BY id"
    )
    .all();
}

function carroPorId(id) {
  return db
    .prepare(
      "SELECT id, marca, modelo, ano, qtde_disponivel FROM carros WHERE id = ?"
    )
    .get(id);
}

function carroAtualizar(id, marca, modelo, ano, qtde) {
  return db
    .prepare(
      "UPDATE carros SET marca = ?, modelo = ?, ano = ?, qtde_disponivel = ? WHERE id = ?"
    )
    .run(marca, modelo, ano, qtde, id);
}

function carroRemover(id) {
  return db.prepare("DELETE FROM carros WHERE id = ?").run(id);
}

/**
 * Decrementa quantidade em 1. Retorna { ok, esgotado, novaQtde }.
 */
function carroVender(id) {
  var row = db
    .prepare("SELECT qtde_disponivel FROM carros WHERE id = ?")
    .get(id);
  if (!row) {
    return { ok: false, esgotado: false, novaQtde: null, motivo: "nao_encontrado" };
  }
  if (row.qtde_disponivel <= 0) {
    return { ok: false, esgotado: true, novaQtde: 0, motivo: "ja_zero" };
  }
  db.prepare(
    "UPDATE carros SET qtde_disponivel = qtde_disponivel - 1 WHERE id = ? AND qtde_disponivel > 0"
  ).run(id);
  var novo = db
    .prepare("SELECT qtde_disponivel FROM carros WHERE id = ?")
    .get(id);
  return {
    ok: true,
    esgotado: novo.qtde_disponivel === 0,
    novaQtde: novo.qtde_disponivel,
  };
}

module.exports = {
  initCarrosDb: initCarrosDb,
  usuarioCriar: usuarioCriar,
  usuarioPorLogin: usuarioPorLogin,
  usuarioPorId: usuarioPorId,
  usuarioListar: usuarioListar,
  usuarioAtualizar: usuarioAtualizar,
  usuarioRemover: usuarioRemover,
  carroCriar: carroCriar,
  carroListarTodos: carroListarTodos,
  carroPorId: carroPorId,
  carroAtualizar: carroAtualizar,
  carroRemover: carroRemover,
  carroVender: carroVender,
};
