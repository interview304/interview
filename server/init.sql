-- Contains all init table statements
CREATE TABLE IF NOT EXISTS example (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    height INT NOT NULL
);