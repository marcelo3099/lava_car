import { useEffect, useState } from "react";
import api from "../services/api";

const OrdensServico = () => {
    const [ordens, setOrdens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const carregarOrdens = async () => {
        try {
            const resposta = await api.get("/ordens-servico");

            setOrdens(resposta.data);

        } catch (error) {
            setErro("Erro ao carregar serviços.");

        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarOrdens();
    }, []);

    if (carregando) return <p>Carregando...</p>;

    if (erro) return <p>{erro}</p>;

    return (
        <section>
            <h2>Ordens de serviço</h2>

            {ordens.map((ordem) => (
                <div key={ordem.id}>
                    <p>
                        Serviço: {ordem.tipoServico}
                    </p>

                    <p>
                        Descrição: {ordem.descricao}
                    </p>

                    <p>
                        Veículo: {
                            ordem.veiculo?.modelo ||
                            ordem.modelo
                        }
                    </p>

                    <p>
                        Proprietário: {
                            ordem.veiculo?.proprietario?.nome ||
                            ordem.proprietarioNome
                        }
                    </p>

                    <p>Status: {ordem.status}</p>

                    <p>
                        Valor: R$ {
                            Number(ordem.valor).toFixed(2)
                        }
                    </p>
                </div>
            ))}
        </section>
    );
};

export default OrdensServico;
