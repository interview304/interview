-- Contains all init table statements
CREATE TABLE IF NOT EXISTS dummy(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS interview(
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL
);