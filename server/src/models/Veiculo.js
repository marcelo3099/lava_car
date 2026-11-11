import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Veiculo = sequelize.define(
    "Veiculo",
    {
        marca: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        modelo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        placa: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        ano: {
            type: DataTypes.INTEGER
        },
        cor: {
            type: DataTypes.STRING(40)
        }
    },
    {
        tableName: "veiculos",
        timestamps: true
    }
);
