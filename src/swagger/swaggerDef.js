const swaggerJSDoc = require('swagger-jsdoc'); //importacao biblioteca

const options = {
  definition: {
    openapi: '3.0.0',  // Versão do OpenAPI
    info: {
      title: 'API Lista de Tarefas',
      version: '1.0.0',
      description: 'Documentação da minha API',
    },
  },
  apis: ['./src/controllers/*.js'], // caminho para as rotas dos arquivos
};

const swaggerSpec = swaggerJSDoc(options); //armazena o doc gerado na variavel swaggerSpec

module.exports = swaggerSpec;
