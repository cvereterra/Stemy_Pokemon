--2. Devolver los pokémon de tipo Electric que haya capturado Ash Ketchum . Campos o
--columnas que debe devolver la consulta:
--id de la tabla pokemon
--level de la tabla pokemon
--name de la tabla pokemon_species
--captured_at de la tabla trainer_pokedex

SELECT p.id, p.level, ps.name, tp.captured_at
from trainer_pokedex tp
	join trainer t on tp.trainer_id=t.id
    join pokemon p on tp.pokemon_id=p.id
    join pokemon_species ps on ps.id=p.pokemon_species_id
    join pokemon_species_type pst on ps.id=pst.pokemon_species_id
    join pokemon_type pt on pst.pokemon_type=pt.type
where 
	t.name = 'Ash Ketchum' AND pt.type='Electric' 