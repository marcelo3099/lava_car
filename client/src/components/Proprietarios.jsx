import { useEffect, useState } from "react";
import api from "../services/api";

const Proprietarios = () => {
    const [proprietarios, setProprietarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const carregarProprietarios = async () => {
        try {
            setCarregando(true);

            const resposta = await api.get("/proprietarios");

            setProprietarios(resposta.data);

        } catch (error) {
            setErro("Não foi possível carregar proprietários.");

        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarProprietarios();
    }, []);

    if (carregando) {
        return <p>Carregando...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <section>
            <h2>Proprietários</h2>

            {proprietarios.map((proprietario) => (
                <p key={proprietario.id}>
                    {proprietario.nome} -
                    {" "}{proprietario.email}
                </p>
            ))}
        </section>
    );
};

export default Proprietarios;
