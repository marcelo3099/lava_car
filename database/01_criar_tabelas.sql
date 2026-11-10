-- =====================================================================
-- Gestão Automotiva - criação das tabelas
-- =====================================================================
-- ANTES de rodar este arquivo:
--   1. No pgAdmin, crie um banco chamado: gestao_automotiva
--   2. Clique com o botão direito no banco > Query Tool
--   3. Abra este arquivo (ou cole o conteúdo) e aperte F5
--
-- A ORDEM IMPORTA: primeiro as tabelas que não dependem de ninguém,
-- depois as que apontam para elas (chave estrangeira).
--   usuarios        -> independente
--   proprietarios   -> independente
--   veiculos        -> aponta para proprietarios
--   ordens_servico  -> aponta para veiculos
--
-- "IF NOT EXISTS" = se a tabela já existir, não dá erro, só pula.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1) USUÁRIOS: funcionários que fazem login no sistema
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id          SERIAL PRIMARY KEY,                 -- número automático (1, 2, 3...)
    nome        VARCHAR(120) NOT NULL,              -- NOT NULL = obrigatório
    email       VARCHAR(160) NOT NULL UNIQUE,       -- UNIQUE = não pode repetir
    senha       VARCHAR(255) NOT NULL,              -- guarda o HASH do bcrypt, nunca a senha pura
    perfil      VARCHAR(20)  NOT NULL
                CHECK (perfil IN ('admin', 'atendente', 'tecnico')),  -- só aceita esses 3 valores
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- data de criação (o Sequelize usa)
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()  -- data da última alteração (o Sequelize usa)
);


-- ---------------------------------------------------------------------
-- 2) PROPRIETÁRIOS: os clientes, donos dos carros
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS proprietarios (
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(120) NOT NULL,
    email       VARCHAR(160) NOT NULL UNIQUE,
    telefone    VARCHAR(20)  NOT NULL,
    cpf         TEXT         NOT NULL,              -- dado sensível: não mostrar nas listagens
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ---------------------------------------------------------------------
-- 3) VEÍCULOS: cada carro pertence a UM proprietário
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS veiculos (
    id               SERIAL PRIMARY KEY,
    marca            VARCHAR(80)  NOT NULL,
    modelo           VARCHAR(100) NOT NULL,
    placa            VARCHAR(10)  NOT NULL UNIQUE,  -- a placa identifica o carro, não repete
    ano              INTEGER,                       -- sem NOT NULL = opcional
    cor              VARCHAR(40),                   -- opcional
    "proprietarioId" INTEGER NOT NULL
                     REFERENCES proprietarios(id),  -- CHAVE ESTRANGEIRA: precisa existir em proprietarios
    "createdAt"      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt"      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ---------------------------------------------------------------------
-- 4) ORDENS DE SERVIÇO: cada serviço pertence a UM veículo
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ordens_servico (
    id            SERIAL PRIMARY KEY,
    "dataEntrada" TIMESTAMPTZ  NOT NULL DEFAULT NOW(),  -- se não informar, usa a data/hora de agora
    descricao     VARCHAR(255) NOT NULL,                -- o que o cliente pediu / problema
    "tipoServico" VARCHAR(100) NOT NULL,                -- ex: 'Lavagem completa', 'Troca de óleo'
    valor         NUMERIC(10,2) NOT NULL DEFAULT 0
                  CHECK (valor >= 0),                   -- não aceita valor negativo
    status        VARCHAR(20)  NOT NULL DEFAULT 'aberto'
                  CHECK (status IN ('aberto', 'em_andamento', 'concluido', 'cancelado')),
    "veiculoId"   INTEGER NOT NULL
                  REFERENCES veiculos(id),              -- CHAVE ESTRANGEIRA: precisa existir em veiculos
    "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ---------------------------------------------------------------------
-- Conferência: deve listar as 4 tabelas
-- ---------------------------------------------------------------------
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
