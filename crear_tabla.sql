CREATE TABLE pokemon_type (
    type VARCHAR(255) PRIMARY KEY
);

CREATE TABLE pokemon_species_type (
    pokemon_species_id INT,
    pokemon_type VARCHAR(255),
    FOREIGN KEY (pokemon_species_id) REFERENCES pokemon_species(id),
    FOREIGN KEY (pokemon_type) REFERENCES pokemon_type(type)
);

CREATE TABLE pokemon_species (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);
-- Crear la tabla pokemon
CREATE TABLE pokemon (
    id INT PRIMARY KEY,
    pokemon_species_id INT,
    level INT,
    FOREIGN KEY (pokemon_species_id) REFERENCES pokemon_species(id)
);


CREATE TABLE trainer (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);


CREATE TABLE trainer_pokedex (
    pokemon_id INT,
    trainer_id INT,
    captured_at TIMESTAMP,
    PRIMARY KEY (pokemon_id, trainer_id, captured_at),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (trainer_id) REFERENCES trainer(id)
);