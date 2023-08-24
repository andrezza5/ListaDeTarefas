const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Número máximo de conexões na pool
});

const initDatabase = async () => {
    const connection = await pool.getConnection();

    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS listarTarefas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                data VARCHAR(255) NOT NULL,
                descricao VARCHAR(255) NOT NULL,
                flag BOOLEAN NOT NULL
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    } finally {
        connection.release();
    }
};

module.exports = { pool, initDatabase };
