/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: Realiza o login de um usuário com base no email e senha fornecidos.
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Credenciais de login (email e senha)
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Login realizado com sucesso!
 *       401:
 *         description: Usuário ou senha inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: Usuário ou senha inválidos!
 */


 const usuariosRepository = require("../repositories/usuariosRepository");

 exports.login = async (req, res) => {
     try {
         const { email, password } = req.body;
 
         const usuario = await usuariosRepository.getUsuarioByEmail(email);
 
         if (!usuario) {
             return res.status(401).json({ message: "Usuário ou senha não encontrado!" });
         }
 
         if (usuario.password !== password) {
             return res.status(401).json({ message: "Usuário ou senha não encontrado!" });
         }
 
         return res.status(200).json({ message: "Login realizado com sucesso!" });
     } catch (error) {
         console.error("Erro durante o login:", error);
         return res.status(500).json({ message: "Erro durante o login." });
     }
 }
 
