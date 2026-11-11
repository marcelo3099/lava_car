import { Proprietario } from "../models/index.js";

export const listarProprietarios = async (req, res) => {
    try {
        const proprietarios = await Proprietario.findAll({
            attributes: {
                exclude: ["cpf"]
            },
            order: [["nome", "ASC"]]
        });

        return res.json(proprietarios);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar proprietários."
        });
    }
};

export const criarProprietario = async (req, res) => {
    try {
        const {
            nome,
            email,
            telefone,
            cpf
        } = req.body;

        const proprietario = await Proprietario.create({
            nome,
            email,
            telefone,
            cpf
        });

        return res.status(201).json({
            id: proprietario.id,
            nome: proprietario.nome,
            email: proprietario.email,
            telefone: proprietario.telefone
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: "Não foi possível cadastrar proprietário."
        });
    }
};
