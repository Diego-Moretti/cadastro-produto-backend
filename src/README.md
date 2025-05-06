# 📦 API de Produtos com Node.js, Express e Prisma

Este projeto é uma API simples para gerenciar produtos, feita com Node.js, Express e Prisma ORM. É ideal para quem está começando no desenvolvimento backend e quer entender como criar rotas, conectar com banco de dados e validar dados.

---

## 🧠 O que você vai aprender aqui:

- Como criar uma API REST com Express.
- Como conectar com um banco de dados usando o Prisma.
- Como validar dados de entrada.
- Como organizar um projeto backend com rotas, controllers e validações.

---

## 🚀 Como rodar este projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/api-produtos.git
cd api-produtos
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o Prisma e o banco de dados

Você precisa de um banco de dados configurado (ex: SQLite, PostgreSQL ou MySQL). No exemplo abaixo, usei o Mongo DB.

Para configurar siga a documentação oficial no site: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb


### 4. Iniciar o servidor

```bash
node src/server.js
```

O servidor vai rodar em: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
src/
│
├── controllers/          # Lógica das rotas (CRUD de produtos)
│   └── productController.js
│
├── models/
│   └── prismaClient.js   # Cliente Prisma para acessar o banco
│
├── routes/
│   └── productRoutes.js  # Define as rotas da API
│
├── validations/
│   └── productValidation.js  # Valida os dados enviados
│
├── app.js                # Configura o Express e as rotas
├── server.js             # Inicia o servidor
```

---

## 🔧 Rotas da API

### ✅ Criar produto
**POST** `/products`

```json
{
  "name": "Camiseta",
  "description": "Camiseta de algodão",
  "price": 49.90,
  "stock": 100
}
```

### 🔍 Listar todos os produtos
**GET** `/products`

Parâmetros opcionais: `id`, `name`

### 🔍 Buscar produto por ID
**GET** `/products/:id`

### ✏️ Atualizar produto
**PUT** `/products/:id`

```json
{
  "name": "Camiseta Atualizada",
  "price": 59.90
}
```

### ❌ Deletar produto
**DELETE** `/products/:id`

---

## 🔎 Validações

Antes de salvar os dados, eles são verificados para garantir que:

- `name`: deve ser uma string e obrigatório.
- `description`: máximo de 500 caracteres.
- `price`: número positivo.
- `stock`: número inteiro positivo.

Essas validações estão no arquivo: `src/validations/productValidation.js`.

---

## 🧰 Tecnologias Usadas

- Node.js
- Express
- Prisma ORM
- Mongo DB
