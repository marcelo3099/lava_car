import {
    OrdemServico,
    Veiculo,
    Proprietario
} from "../models/index.js";

export const criarOrdemServico = async (req, res) => {
    try {
        const {
            descricao,
            tipoServico,
            valor,
            veiculoId
        } = req.body;

        const ordem = await OrdemServico.create({
            descricao,
            tipoServico,
            valor,
            veiculoId
        });

        return res.status(201).json(ordem);

    } catch (erro) {
        return res.status(400).json({
            mensagem: "Não foi possível criar ordem de serviço."
        });
    }
};

export const listarOrdensServico = async (req, res) => {
    try {
        const ordens = await OrdemServico.findAll({
            include: [{
                model: Veiculo,
                as: "veiculo",
                include: [{
                    model: Proprietario,
                    as: "proprietario",
                    attributes: ["id", "nome"]
                }]
            }],
            order: [["dataEntrada", "DESC"]]
        });

        return res.json(ordens);

    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar ordens de serviço."
        });
    }
};

export const atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ordem = await OrdemServico.findByPk(id);

        if (!ordem) {
            return res.status(404).json({
                mensagem: "Ordem de serviço não encontrada."
            });
        }

        await ordem.update({ status });

        return res.json(ordem);

    } catch (erro) {
        return res.status(400).json({
            mensagem: "Não foi possível atualizar o status."
        });
    }
};
