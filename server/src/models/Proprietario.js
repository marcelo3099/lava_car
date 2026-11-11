import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Proprietario = sequelize.define(
    "Proprietario",
    {
        nome: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(160),
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        cpf: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: "proprietarios",
        timestamps: true
    }
);
