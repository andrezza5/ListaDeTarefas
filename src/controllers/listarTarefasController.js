const listarTarefasRepository = require("../repositories/listarTarefasRepository");


/**
 * @swagger
 * /api/listarTarefas:
 *   get:
 *     summary: Retorna uma lista de tarefas
 *     description: Obtém uma lista de tarefas com opção de filtrar por tipo
 *     parameters:
 *       - in: query
 *         name: tipo
 *         description: Filtra as tarefas por tipo (opcional)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 data: 2023-08-15
 *                 descricao: Tarefa 1
 *                 flag: Tarefa executada
 *               - id: 2
 *                 data: 2023-08-16
 *                 descricao: Tarefa 2
 *                 flag: Tarefa não executada
 */

exports.getAllListarTarefas = async (req, res) => {   
    const tipo = req.query.tipo;
    const listarTarefas = await listarTarefasRepository.getAllListarTarefas(tipo); 

    const tasksWithStatus = listarTarefas.map(task => ({
        id: task.id,
        data: task.data,
        descricao: task.descricao,
        flag: task.flag ? "Tarefa executada" : "Tarefa não executada"
    }));

    res.json(tasksWithStatus);
};

/**
 * @swagger
 * /api/listarTarefas/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo seu ID
 *     description: Obtém uma tarefa pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser retornada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa retornada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */

exports.getListarTarefasById = async (req, res) => {   
    const id = parseInt(req.params.id);
    const listarTarefas = await listarTarefasRepository.getListarTarefasById(id); 
    res.json(listarTarefas);
};

/**
 * @swagger
 * /api/listarTarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa com os detalhes fornecidos no corpo da requisição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *               descricao:
 *                 type: string
 *               flag:
 *                 type: string
 *             example:
 *               data: 2023-08-15
 *               descricao: Minha nova tarefa
 *               flag: Tarefa executada
 *     responses:
 *       200:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               data: 2023-08-15
 *               descricao: Minha nova tarefa
 *               flag: Tarefa executada
 *       500:
 *         description: Erro ao criar a tarefa
 */

exports.createListarTarefas = async (req, res) => {   
    const { data, descricao, flag } = req.body;
    const flagValue = flag === "Tarefa executada";
    const novaListarTarefas = { data, descricao, flag: flagValue };
    try {
        const newListarTarefas = await listarTarefasRepository.createListarTarefas(novaListarTarefas); 
        res.json({
            id: newListarTarefas.insertId,
            data,
            descricao,
            flag: flagValue ? "Tarefa executada" : "Tarefa não executada"
        });
    } catch (error) {
        res.status(500).json({
            error: "Erro ao cadastrar a tarefa"
        });
    }
};

/**
 * @swagger
 * /api/listarTarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente pelo seu ID
 *     description: Atualiza uma tarefa existente pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *               descricao:
 *                 type: string
 *               flag:
 *                 type: string
 *             example:
 *               data: 2023-08-15
 *               descricao: Atualização de tarefa
 *               flag: Tarefa executada
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               data: 2023-08-15
 *               descricao: Tarefa atualizada
 *               flag: Tarefa executada
 *       500:
 *         description: Erro ao atualizar a tarefa
 */

exports.updateListarTarefas = async (req, res) => {   
    const id = parseInt(req.params.id);
    const { data, descricao, flag } = req.body;
    const updateListarTarefas = await listarTarefasRepository.updateListarTarefas(id, { data, descricao, flag: flag === "true" }); 
    res.json(updateListarTarefas);
};

/**
 * @swagger
 * /api/listarTarefas/{id}:
 *   delete:
 *     summary: Deleta uma tarefa pelo seu ID
 *     description: Deleta uma tarefa pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Tarefa excluída com sucesso
 *       500:
 *         description: Erro ao excluir a tarefa
 */

exports.deleteListarTarefas = async (req, res) => {   
    const id = parseInt(req.params.id);
    await listarTarefasRepository.deleteListarTarefas(id); 
    res.json({ message: `lista de tarefa ${id} excluída` });
};
