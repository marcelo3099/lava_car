import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Usuario } from "../models/index.js";

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Consulta com Sequelize
        const usuario = await Usuario.findOne({
            where: { email }
        });

        // Lógica comum às duas alternativas
        const senhaValida = usuario &&
            await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: "Credenciais inválidas."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30m"
            }
        );

        return res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                perfil: usuario.perfil
            }
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao realizar login."
        });
    }
};
