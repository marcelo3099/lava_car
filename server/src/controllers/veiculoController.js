import {
    Veiculo,
    Proprietario
} from "../models/index.js";

export const listarVeiculos = async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll({
            include: [{
                model: Proprietario,
                as: "proprietario",
                attributes: ["id", "nome"]
            }],
            order: [["modelo", "ASC"]]
        });

        return res.json(veiculos);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar veículos."
        });
    }
};

export const criarVeiculo = async (req, res) => {
    try {
        const {
            marca,
            modelo,
            placa,
            ano,
            cor,
            proprietarioId
        } = req.body;

        const veiculo = await Veiculo.create({
            marca,
            modelo,
            placa,
            ano,
            cor,
            proprietarioId
        });

        return res.status(201).json(veiculo);

    } catch (erro) {
        return res.status(400).json({
            mensagem: "Não foi possível cadastrar veículo."
        });
    }
};
