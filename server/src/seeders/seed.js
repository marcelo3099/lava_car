import bcrypt from "bcrypt";

import { sequelize } from "../config/database.js";
import {
    Usuario,
    Proprietario,
    Veiculo,
    OrdemServico
} from "../models/index.js";

const usuarios = [
    { nome: "Administrador", email: "admin@email.com", senha: "123456", perfil: "admin" },
    { nome: "Ana Atendente", email: "atendente@email.com", senha: "123456", perfil: "atendente" },
    { nome: "Tiago Técnico", email: "tecnico@email.com", senha: "123456", perfil: "tecnico" }
];

const dados = [
    {
        proprietario: {
            nome: "Carlos Silva",
            email: "carlos@email.com",
            telefone: "48999990000",
            cpf: "11122233344"
        },
        veiculo: {
            marca: "Volkswagen",
            modelo: "Gol",
            placa: "ABC1D23",
            ano: 2020,
            cor: "Branco"
        },
        ordem: {
            descricao: "Manutenção preventiva",
            tipoServico: "Troca de óleo",
            valor: 180.00,
            status: "aberto"
        }
    },
    {
        proprietario: {
            nome: "Maria Souza",
            email: "maria@email.com",
            telefone: "48988881111",
            cpf: "22233344455"
        },
        veiculo: {
            marca: "Fiat",
            modelo: "Argo",
            placa: "DEF2G34",
            ano: 2022,
            cor: "Vermelho"
        },
        ordem: {
            descricao: "Cliente pediu lavagem com aspiração",
            tipoServico: "Lavagem completa",
            valor: 80.00,
            status: "em_andamento"
        }
    },
    {
        proprietario: {
            nome: "João Pereira",
            email: "joao@email.com",
            telefone: "48977772222",
            cpf: "33344455566"
        },
        veiculo: {
            marca: "Chevrolet",
            modelo: "Onix",
            placa: "HIJ3K45",
            ano: 2019,
            cor: "Prata"
        },
        ordem: {
            descricao: "Barulho ao frear",
            tipoServico: "Troca de pastilhas",
            valor: 350.00,
            status: "concluido"
        }
    }
];

const executarSeed = async () => {
    const transaction = await sequelize.transaction();

    try {
        for (const usuario of usuarios) {
            const senhaHash = await bcrypt.hash(usuario.senha, 10);

            await Usuario.findOrCreate({
                where: {
                    email: usuario.email
                },
                defaults: {
                    nome: usuario.nome,
                    email: usuario.email,
                    senha: senhaHash,
                    perfil: usuario.perfil
                },
                transaction
            });
        }

        for (const item of dados) {
            const [proprietario] = await Proprietario.findOrCreate({
                where: {
                    email: item.proprietario.email
                },
                defaults: item.proprietario,
                transaction
            });

            const [veiculo] = await Veiculo.findOrCreate({
                where: {
                    placa: item.veiculo.placa
                },
                defaults: {
                    ...item.veiculo,
                    proprietarioId: proprietario.id
                },
                transaction
            });

            await OrdemServico.findOrCreate({
                where: {
                    descricao: item.ordem.descricao,
                    veiculoId: veiculo.id
                },
                defaults: {
                    ...item.ordem,
                    veiculoId: veiculo.id
                },
                transaction
            });
        }

        await transaction.commit();
        console.log("Seed executado com sucesso.");

    } catch (erro) {
        await transaction.rollback();
        console.error("Erro ao executar seed:", erro);
        process.exitCode = 1;

    } finally {
        await sequelize.close();
    }
};

executarSeed();
