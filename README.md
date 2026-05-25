# Guia Full Stack — servidor, EJS, ligação de páginas e CRUD

Este documento está na raiz de **`FullStack`** e resume o que precisas para a disciplina (Node + Express + HTML estático + EJS + base de dados), alinhado ao que tens em **`primeiroSemetres/servidor/`**.

---

## 1. Estrutura que importa para a prova

```
FullStack/
└── primeiroSemetres/
    └── servidor/                 ← pasta onde corres o Node
        ├── package.json          ← dependências e scripts
        ├── servidor.js           ← aplicação Express (rotas, porta)
        ├── blog-db.js            ← exemplo: BD do blog (LAB 9)
        ├── carros-db.js          ← exemplo: BD dos carros (LAB 10)
        ├── views/                ← templates EJS (.ejs)
        │   └── partials/         ← fragmentos reutilizáveis (nav, etc.)
        └── public/               ← ficheiros estáticos (HTML, CSS, JS, imagens)
            └── primeiroSemetres/
                ├── projects.html ← tabela com links para os labs
                ├── index.html
                └── labs/...
```

- **`servidor.js`**: lógica HTTP (o “cérebro”).
- **`public/`**: o browser pede ficheiros por URL (`/primeiroSemetres/style.css`, etc.).
- **`views/`**: páginas **geradas no servidor** com dados (EJS).

---

## 2. Correr o servidor pelo CMD (ou PowerShell)

### 2.1 Pré-requisitos

1. Instala o [Node.js](https://nodejs.org/) (LTS). Isto instala também o **`npm`**.
2. No terminal, confirma:

```cmd
node -v
npm -v
```

### 2.2 Ir à pasta do servidor

**CMD:**

```cmd
cd C:\Users\henri\OneDrive\FEI\FullStack\primeiroSemetres\servidor
```

(Ajusta o caminho se a tua pasta for outra.)

### 2.3 Instalar dependências (só quando clonas o projeto ou mudas o `package.json`)

```cmd
npm install
```

### 2.4 Subir o servidor

```cmd
node servidor.js
```

Se no `servidor.js` a porta for **80**, no Windows muitas vezes precisas de abrir o **CMD ou PowerShell como administrador**; caso contrário pode dar erro de permissão. Alternativa para testes: mudar temporariamente para `3000` e abrir `http://localhost:3000/`.

### 2.5 Parar o servidor

No terminal onde está a correr: **Ctrl+C**.

---

## 3. Criar um servidor Node + Express “do zero” (resumo de prova)

Na pasta do projeto:

```cmd
mkdir meu-servidor
cd meu-servidor
npm init -y
npm install express body-parser ejs
```

Cria `servidor.js` com o mínimo:

```javascript
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  res.send("Olá");
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, function () {
  console.log("http://localhost:3000");
});
```

- **`express()`** cria a aplicação.
- **`app.get` / `app.post`** definem rotas.
- **`express.static('public')`** serve HTML/CSS/JS sem escreveres uma rota para cada ficheiro.
- **Ordem importa**: rotas específicas (por exemplo `/blog`, `/carros`) devem ficar **antes** do `express.static`, senão um ficheiro estático com o mesmo nome pode “ganhar” à rota.

---

## 4. Para que serve o EJS?

**EJS** (*Embedded JavaScript*) é um motor de **templates**: ficheiros `.ejs` no servidor que misturam **HTML** com **JavaScript** para gerar HTML final enviado ao browser.

| HTML estático em `public/` | EJS em `views/` |
|----------------------------|-----------------|
| Sempre igual para todos    | Pode mudar consoante dados (BD, sessão, query) |
| Abrir em `file://` pode funcionar para alguns labs | Precisa do Express a correr (`http://localhost/...`) |

**Configuração típica:**

```javascript
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
```

**Enviar uma página dinâmica:**

```javascript
app.get("/exemplo", function (req, res) {
  res.render("minha_pagina", { titulo: "Olá", lista: [1, 2, 3] });
});
```

Isto procura `views/minha_pagina.ejs` e passa as variáveis `titulo` e `lista`.

**Sintaxe rápida no `.ejs`:**

- `<%= valor %>` — imprime escapado (texto seguro).
- `<% codigo %>` — executa JS sem imprimir (ciclos, `if`).
- `<%- include('partials/rodape') %>` — inclui outro ficheiro (nav comum, etc.).

**`res.locals`**: variáveis que queres em **todas** as views (por exemplo `usuarioLogado`) podes definir num `app.use` antes das rotas.

---

## 5. Como “ligar” os projetos (HTML, labs, Express)

### 5.1 Links **relativos** (dentro de `public/`)

De `projects.html` para um lab na mesma árvore:

```html
<a href="labs/lab04/index.html">LAB 4</a>
```

Isto funciona em `http://localhost/primeiroSemetres/projects.html` porque o browser pede `.../primeiroSemetres/labs/lab04/index.html`.

### 5.2 Links que começam em **`/`** (raiz do site = servidor)

Rotas do Express ou ficheiros na raiz de `public/`:

```html
<a href="/blog">Blog</a>
<a href="/carros">Carros (LAB 10)</a>
<a href="/login">Login (LAB 8)</a>
```

**Importante:** links como `/blog` **só funcionam com o servidor a correr**. Com `file://` não há servidor — não uses isso para testar o blog ou o EJS.

### 5.3 Redirecionar a raiz `/` para a página de projetos

No teu `servidor.js` (padrão do enunciado):

```javascript
app.get("/", function (req, res) {
  res.redirect("/primeiroSemetres/projects.html");
});
```

Assim `http://localhost/` abre diretamente a lista de laboratórios.

### 5.4 Formulários a apontar para rotas POST

```html
<form method="post" action="/carros/novo">
  <!-- campos name="..." -->
  <button type="submit">Enviar</button>
</form>
```

No Express: `app.post("/carros/novo", function (req, res) { ... })` e lês os campos com `req.body` (com `bodyParser.urlencoded`).

---

## 6. CRUD — o que é e como mapear para a web

**CRUD** = **C**reate, **R**ead, **U**pdate, **D**elete (operações básicas sobre dados).

| Operação | HTTP típico (exemplo) | O que fazes no código |
|----------|------------------------|------------------------|
| **Create** | `POST /recursos` ou `POST /recursos/novo` | Inserir na BD, depois `redirect` ou mensagem |
| **Read** (lista) | `GET /recursos` | `SELECT` todos → `res.render` com array |
| **Read** (um) | `GET /recursos/:id` | `SELECT` por id → formulário de edição ou detalhe |
| **Update** | `POST /recursos/editar/:id` | `UPDATE ... WHERE id = ?` → `redirect` |
| **Delete** | `POST /recursos/remover/:id` | `DELETE ... WHERE id = ?` → `redirect` |

Na prova, HTML forms só suportam bem **GET** e **POST**; por isso **update** e **delete** costumam ser **POST** (às vezes com `_method` e middleware, mas o mais simples é POST direto).

**Fluxo mental:** rota recebe pedido → chama funções do módulo da BD → `redirect` ou `render` com mensagem.

---

## 7. Base de dados no teu projeto (SQLite + JavaScript)

Usas **`better-sqlite3`**: acesso síncrono, simples para prova.

Padrão num ficheiro tipo `carros-db.js`:

1. **`Database(caminho)`** abre o ficheiro `.sqlite`.
2. **`db.exec('CREATE TABLE IF NOT EXISTS ...')`** na inicialização.
3. **`db.prepare('SQL').run(...)`** — insert, update, delete.
4. **`db.prepare('SQL').get(...)`** — uma linha.
5. **`db.prepare('SQL').all(...)`** — várias linhas.

Exportas funções (`carroListarTodos`, `carroCriar`, …) e no `servidor.js` fazes `require('./carros-db')`.

**Dica de prova:** separar **rotas** (`servidor.js`) da **camada de dados** (`*-db.js`) facilita ler e não misturar SQL com HTML.

---

## 8. Sessão (login) — ideia geral

Para páginas só depois de login (`/carros/gerencia`):

1. `npm install express-session`
2. `app.use(session({ secret: '...', resave: false, saveUninitialized: false }))`
3. No POST de login bem-sucedido: `req.session.userId = ...`
4. Middleware `requireAuth`: se não houver sessão, `res.redirect('/login')`

---

## 9. Checklist rápido antes da prova

- [ ] Saber **mudar de pasta** no CMD (`cd`) e correr **`node servidor.js`**
- [ ] Saber quando usar **`npm install`**
- [ ] Diferença **ficheiro estático** (`public`) vs **EJS** (`views` + `res.render`)
- [ ] **`req.query`** (GET), **`req.body`** (POST com `body-parser`), **`req.params`** (`/editar/:id`)
- [ ] **Ordem** das rotas em relação ao **`express.static`**
- [ ] CRUD: qual SQL para cada operação
- [ ] Links **`/rota`** precisam do servidor; links **`labs/...`** são relativos ao HTML atual

---

## 10. Onde ver isto no teu código

| Tema | Ficheiros de referência |
|------|-------------------------|
| Servidor, porta 80, `/` → projetos | `primeiroSemetres/servidor/servidor.js` |
| EJS + POST (resposta) | `views/resposta.ejs`, rotas `/cadastra`, `/login` |
| Blog (read + create) | `blog-db.js`, `GET /blog`, `POST /blog/post`, `views/blog.ejs` |
| CRUD completo + venda | `carros-db.js`, rotas `/carros/...`, `views/carros_*.ejs` |
| Tabela de links dos labs | `public/primeiroSemetres/projects.html` |

Boa prova. Se algo da matéria não estiver aqui (por exemplo Mongo em vez de SQLite), segue o mesmo mapa mental: **rotas → lógica → BD → resposta (HTML/EJS ou redirect)**.
