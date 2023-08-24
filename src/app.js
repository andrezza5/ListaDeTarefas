require("./config/dotenv");
require("express-async-errors");

const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerDef');
const { initDatabase } = require("./config/db");
const cors = require("cors");

const listarTarefasRoute = require("./routes/listarTarefasRoute");
const authRoute = require("./routes/authRoute");

const app = express();

const port = process.env.APP_PORT || 5000;

app.get("/", (req, res) => {
    res.send("Seja bem-vindo à API lista de tarefas!");
});

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/listarTarefas", listarTarefasRoute);
app.use("/api/auth", authRoute);

initDatabase();

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ 'Erro': err.message });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
