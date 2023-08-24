const { pool } = require("../config/db");

exports.getUsuarioByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return result[0][0]; // Ajuste aqui para pegar o primeiro usuário do resultado
    } catch (error) {
        throw error;
    }
}
