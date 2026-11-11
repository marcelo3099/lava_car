import { useState } from "react";

import Login from "./components/Login";
import Proprietarios from "./components/Proprietarios";
import Veiculos from "./components/Veiculos";
import OrdensServico from "./components/OrdensServico";

import "./App.css";

const App = () => {
    const [usuario, setUsuario] = useState(null);

    const sair = () => {
        sessionStorage.removeItem("token");
        setUsuario(null);
    };

    return (
        <main className="container">

            {!usuario ? (
                <Login
                    onLogin={(dados) => setUsuario(dados)}
                />
            ) : (
                <>
                    <header className="topo">
                        <div>
                            <h1>Gestão Automotiva</h1>

                            <p>
                                Bem-vindo(a), {usuario.nome}
                            </p>
                        </div>

                        <button onClick={sair}>
                            Sair
                        </button>
                    </header>

                    <div className="painel">
                        <Proprietarios />
                        <Veiculos />
                        <OrdensServico />
                    </div>
                </>
            )}

        </main>
    );
};

export default App;
