# Desafio AVMB Certificados

Sistema fullstack desenvolvido como parte de um desafio técnico para um processo seletivo de desenvolvedor Full Stack com foco em Node.js. A aplicação tem como objetivo gerenciar alunos e realizar a emissão automatizada de certificados em formato XML, com validação de dados e disponibilização para consulta pública.

---

## Sobre o projeto

O projeto foi construído para simular um cenário real onde instituições de ensino precisam importar dados de alunos, validar essas informações, gerar certificados e disponibilizá-los de forma segura e acessível.

A solução contempla desde a autenticação da instituição até a geração e consulta dos certificados, incluindo integração com banco de dados e notificações externas.

---

## Funcionalidades

* Cadastro e autenticação de instituições utilizando JWT
* Importação de alunos via JSON
* Validação de dados com JSON Schema utilizando AJV
* Geração de hash único por aluno
* Emissão de certificados em formato XML
* Notificação via webhook (configurável)
* Consulta pública de certificados através de URL
* Soft delete de registros (desativação sem exclusão física)

---

## Arquitetura

A aplicação é dividida em duas camadas principais:

### Backend

Responsável pelas regras de negócio, autenticação, validação de dados, geração de certificados e integração com o banco de dados.

### Frontend

Interface desenvolvida em Vue.js 3 para interação das instituições com o sistema, permitindo o gerenciamento de alunos e certificados.

---

## Tecnologias utilizadas

### Backend

* Node.js
* Express
* PostgreSQL
* JSON Web Token (JWT)
* AJV (validação de JSON Schema)
* XMLBuilder2 (geração de XML)

### Frontend

* Vue.js 3
* Axios


---

## Pré-requisitos

* Node.js (versão 18 ou superior)
* PostgreSQL
* Git

---

## Instalação

### Clonar o repositório

```bash
git clone https://github.com/MauricioCogo/DesafioAVMBCertificados.git
cd DesafioAVMBCertificados
```

---

### Configuração de ambiente

Criar um arquivo `.env` com base no `.env.example`:

```env
PORT=3000
DATABASE_URL=postgres://usuario:senha@localhost:5432/database
JWT_SECRET=sua_chave_secreta
```

---

### Instalar dependências

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

---

### Execução

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## Fluxo da aplicação

1. A instituição realiza cadastro ou login
2. Recebe um token JWT para autenticação
3. Envia um arquivo JSON contendo os dados dos alunos
4. O sistema valida os dados com base em um JSON Schema
5. Os dados válidos são persistidos no banco de dados
6. Um hash único é gerado para cada aluno
7. Um certificado em XML é criado automaticamente
8. Um webhook pode ser acionado com os dados processados
9. O certificado pode ser consultado publicamente via URL

---

## Possíveis melhorias

* Implementação de pipeline de CI/CD
* Suporte a WebSockets para notificações em tempo real
* Melhor organização e gerenciamento de estado no frontend
* Evolução para arquitetura multi-tenant completa
* Adição de documentação de API (Swagger/OpenAPI)

---

## Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica em processo seletivo.

---

## Autor

Maurício Cogo
