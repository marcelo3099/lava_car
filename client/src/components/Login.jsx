import { useState } from "react";
import api from "../services/api";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const realizarLogin = async (event) => {
        event.preventDefault();

        setErro("");

        try {
            const resposta = await api.post(
                "/auth/login",
                { email, senha }
            );

            sessionStorage.setItem(
                "token",
                resposta.data.token
            );

            onLogin(resposta.data.usuario);

        } catch (error) {
            setErro(
                error.response?.data?.mensagem ||
                "Falha ao entrar."
            );
        }
    };

    return (
        <form onSubmit={realizarLogin}>
            <h2>Gestão Automotiva</h2>

            <label htmlFor="email">E-mail</label>

            <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
                required
            />

            <label htmlFor="senha">Senha</label>

            <input
                id="senha"
                type="password"
                value={senha}
                onChange={(event) =>
                    setSenha(event.target.value)
                }
                required
            />

            <button type="submit">
                Entrar
            </button>

            {erro && <p>{erro}</p>}
        </form>
    );
};

export default Login;
