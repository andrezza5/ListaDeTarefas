const { pool } = require('../config/db');

exports.getAllListarTarefas = async (tipo) => {
    let query = 'SELECT * FROM listarTarefas';
    
    if (tipo) {
        query += ` WHERE tipo = '${tipo}'`;
    }

    const [rows] = await pool.query(query);
    
    return rows;
}

exports.getListarTarefasById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM listarTarefas WHERE id = ?', [id]);
    return rows[0];
}

exports.createListarTarefas = async (listarTarefas) => {
    const [result] = await pool.query(`
        INSERT INTO listarTarefas (data, descricao, flag)
        VALUES (?, ?, ?)
    `, [listarTarefas.data, listarTarefas.descricao, listarTarefas.flag]);
    return result;
}

exports.updateListarTarefas = async (id, listarTarefas) => {
    const [result] = await pool.query(`
        UPDATE listarTarefas
        SET data = ?, descricao = ?, flag = ?
        WHERE id = ?
    `, [listarTarefas.data, listarTarefas.descricao, listarTarefas.flag, id]);
    return result;
}

exports.deleteListarTarefas = async (id) => {
    await pool.query('DELETE FROM listarTarefas WHERE id = ?', [id]);
}
