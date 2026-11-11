import { useEffect, useState } from "react";
import api from "../services/api";

const Veiculos = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const carregarVeiculos = async () => {
        try {
            const resposta = await api.get("/veiculos");

            setVeiculos(resposta.data);

        } catch (error) {
            setErro("Erro ao carregar veículos.");

        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarVeiculos();
    }, []);

    if (carregando) return <p>Carregando...</p>;

    if (erro) return <p>{erro}</p>;

    return (
        <section>
            <h2>Veículos</h2>

            {veiculos.map((veiculo) => (
                <div key={veiculo.id}>
                    <p>
                        {veiculo.marca} {veiculo.modelo}
                    </p>

                    <p>Placa: {veiculo.placa}</p>

                    <p>
                        Proprietário: {
                            veiculo.proprietario?.nome ||
                            veiculo.proprietarioNome
                        }
                    </p>
                </div>
            ))}
        </section>
    );
};

export default Veiculos;
