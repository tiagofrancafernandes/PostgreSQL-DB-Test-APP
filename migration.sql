-- Criar tabela items
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Inserir dados de teste
INSERT INTO items (name) VALUES
    ('Item 1'),
    ('Item 2'),
    ('Item 3');
