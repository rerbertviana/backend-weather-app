
# 📌 Instructions in English

# Backend - WeatherApp

This repository contains the backend of a weather forecast application, developed with **Node.js**, **Prisma** (ORM), and **Express** (service).

## 🚀 Step-by-Step Execution

### 1. Install Dependencies - Node
First, install the Node dependencies:
```bash
npm install
```

### 2. Start Docker
Second, start the Docker container with the database:
```bash
docker-compose up -d
```

### 3. Run Prisma Migrations
Next, run the migrations to set up the database:
```bash
npx prisma migrate dev --name init
```

### 4. Start the Backend
Now, start the backend server:
```bash
npm run dev
```

### 5. Success Message
If everything is working correctly, you will see the following message in the terminal:
```bash
🔥 Servidor rodando na porta 3000
```
***
# 📌 Instruções em Português

# Backend - WeatherApp

Este repositório contém o backend de um aplicativo de previsão do tempo, desenvolvido com **Node.js**, **Prisma** (ORM) e **Express** (service).

## 🚀 Passo a Passo para Execução

### 1. Instale as dependências - Node
Primeiro, instale as dependências do Node:
```bash
npm install
```

### 2. Subir o Docker
Segundo, suba o contêiner Docker com o banco de dados:
```bash
docker-compose up -d
```

### 3. Rodar Migrations do Prisma
Em seguida, execute as migrations para configurar o banco de dados:
```bash
npx prisma migrate dev --name init
```

### 4. Subir o Backend
Agora, inicie o servidor backend:
```bash
npm run dev
```

### 5. Mensagem de Sucesso
Se tudo estiver funcionando corretamente, você verá a seguinte mensagem no terminal:
```bash
🔥 Servidor rodando na porta 3000
```
