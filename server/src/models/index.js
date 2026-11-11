import { Usuario } from "./Usuario.js";
import { Proprietario } from "./Proprietario.js";
import { Veiculo } from "./Veiculo.js";
import { OrdemServico } from "./OrdemServico.js";

// Proprietário possui vários veículos
Proprietario.hasMany(Veiculo, {
    foreignKey: "proprietarioId",
    as: "veiculos"
});

Veiculo.belongsTo(Proprietario, {
    foreignKey: "proprietarioId",
    as: "proprietario"
});

// Veículo possui várias ordens de serviço
Veiculo.hasMany(OrdemServico, {
    foreignKey: "veiculoId",
    as: "ordensServico"
});

OrdemServico.belongsTo(Veiculo, {
    foreignKey: "veiculoId",
    as: "veiculo"
});

export {
    Usuario,
    Proprietario,
    Veiculo,
    OrdemServico
};
