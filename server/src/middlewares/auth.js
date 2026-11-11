import jwt from "jsonwebtoken";

export const autenticar = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            mensagem: "Token não informado."
        });
    }

    try {
        req.usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return next();

    } catch {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });
    }
};
