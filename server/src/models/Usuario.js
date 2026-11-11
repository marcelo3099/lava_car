import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Usuario = sequelize.define(
    "Usuario",
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
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        perfil: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isIn: [[
                    "admin",
                    "atendente",
                    "tecnico"
                ]]
            }
        }
    },
    {
        tableName: "usuarios",
        timestamps: true
    }
);
