<h1 align="center">
  <img src="public/images/logo.png" width="50%" />
</h1>

<p align="center">
  <a href="#contexto-">Contexto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-">Desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-executar-%EF%B8%8F">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias-">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença-">Licença</a>
</p>

## Contexto 📝

Projeto desenvolvido para o desafio proposto pelo MundoJix como parte do processo de seleção para Pessoa Desenvolvedora Full Stack Junior.

Trata-se de um modulo/sistema para validação de horas extracurriculares, onde os alunos podem anexar seus documentos e controlar a quantidade de horas que já concluíram.

## Desafio ✅

Foi solicitada a implementação de uma interface de exibição dos documentos enviados pelo estudante, contendo:

[x] Grid com a lista de documentos enviados pelo aluno;
[x] Coluna com link do nome do documento para acesso ao documento;
[x] Coluna com o tipo de atividade do certificado;
[x] Coluna com a quantidade de horas;
[x] Coluna com o status do documento: Homologado / Não-Homologado.

Além disso, foi sugerida a implementação da função de backend para consultar os dados no banco e retornar um objeto ao front com a lista dos certificados do usuário.

## Como Executar ▶️

A API da aplicação está disponível no endereço https://sysdoc-api.herokuapp.com e a sua documentação pode ser acessada em https://sysdoc-api.herokuapp.com/docs. Se ainda desejar rodar a aplicação na sua maquina local, seguem as instruções.

Para executar o projeto, você precisa ter o [Node.js](https://nodejs.org) instalado em sua máquina.

1. Clonando o projeto:
```
git clone https://github.com/nataliafonseca/sysdoc_backend
```
2. Acessando a pasta clonada:
```
cd sysdoc_backend
```
3. Instalando as dependências
```
npm i
```
4. Executando a aplicação
```
npm run dev
```

A API poderá ser acessada em http://localhost:4000.

## Tecnologias 💻

O backend da aplicação foi implementado em **Node.js** utilizando a linguagem **TypeScript**.
Para criar a API REST, foi utilizado o framework **express**.
O banco de dados utilizado foi **PostgreSQL**, provisionado no serviço **RDS** da AWS.
Para o armazenamento dos documentos enviados, foi utilizado um bucket no serviço **S3** da AWS.
O deploy da API foi feito no **Heroku**.

## Licença 📃

Este projeto está sob a licença MIT. Para mais detalhes, veja o arquivo [LICENSE](LICENSE).
