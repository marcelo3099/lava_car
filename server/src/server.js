import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/index.js";
import { sequelize } from "./config/database.js";
import "./models/index.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN
}));

app.use(express.json());

app.use("/api", router);

const iniciar = async () => {
    try {
        // Opção Sequelize:
        // importa sequelize e os Models/associações;
        // executa await sequelize.authenticate().
        await sequelize.authenticate();

        app.listen(process.env.PORT || 3000, () => {
            console.log("Servidor iniciado.");
        });

    } catch (erro) {
        console.error("Falha ao iniciar:", erro);
        process.exit(1);
    }
};

iniciar();
