import { Router } from "express";

import { autenticar } from "../middlewares/auth.js";

import { login } from "../controllers/authController.js";

import {
    listarProprietarios,
    criarProprietario
} from "../controllers/proprietarioController.js";

import {
    listarVeiculos,
    criarVeiculo
} from "../controllers/veiculoController.js";

import {
    listarOrdensServico,
    criarOrdemServico,
    atualizarStatus
} from "../controllers/ordemServicoController.js";

const router = Router();

// Autenticação
router.post("/auth/login", login);

// Proprietários
router.get("/proprietarios", autenticar, listarProprietarios);
router.post("/proprietarios", autenticar, criarProprietario);

// Veículos
router.get("/veiculos", autenticar, listarVeiculos);
router.post("/veiculos", autenticar, criarVeiculo);

// Ordens de serviço
router.get("/ordens-servico", autenticar, listarOrdensServico);
router.post("/ordens-servico", autenticar, criarOrdemServico);

router.patch(
    "/ordens-servico/:id/status",
    autenticar,
    atualizarStatus
);

export default router;
