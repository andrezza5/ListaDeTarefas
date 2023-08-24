const express = require("express");

const listarTarefasController = require("../controllers/listarTarefasController");

const router = express.Router();

router.get("/", listarTarefasController.getAllListarTarefas);
router.get("/:id", listarTarefasController.getListarTarefasById);
router.post("/", listarTarefasController.createListarTarefas);
router.put("/:id", listarTarefasController.updateListarTarefas);
router.delete("/:id", listarTarefasController.deleteListarTarefas);

module.exports = router;