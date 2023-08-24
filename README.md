# ListaDeTarefas

##Descrição do Projeto

O projeto Lista de Tarefas é uma aplicação desenvolvida em JavaScript que permite aos usuários criar, atualizar, deletar, listar tarefas e marcá-las como concluídas ou não.

##Linguagem utilizada

javascript

##Documentação da API

A API da Lista de Tarefas é documentada usando o Swagger, o que facilita a compreensão das rotas disponíveis, seus parâmetros e respostas. Para Acessar a documentação da API siga os passos abaixo:
1. Clone o repositório para o seu computador.
2. Inicie a aplicação(npm run dev).
3. Acesse a documentação em: [http://localhost:5000/api-docs/#/]

##Rotas

POST /api/auth/login: Realizar o login de um usuário.

POST /api/listarTarefas: Criar nova tarefa.
PUT /api/listarTarefas/{id}: Atualizar tarefa por ID.
DELETE /api/listarTarefas/{id}: Excluir tarefa por ID.
GET /api/listarTarefas: Listar tarefas.
GET /api/listarTarefas/{id}: Obter tarefa por ID.

##Erros
Se ocorrer um erro durante as solicitações à API, a API retornará um objeto JSON com a mensagem de erro correspondente.



