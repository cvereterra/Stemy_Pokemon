/*
*	3. Devolver último pokémon que haya capturado Brock . Campos o columnas que debe
*	devolver la consulta:
*	id de la tabla pokemon
*	level de la tabla pokemon
*	name de la tabla pokemon_species
*	captured_at de la tabla trainer_pokedex
*/

SELECT p.id, p.level, ps.name, tp.captured_at
from trainer t
	join trainer_pokedex tp on t.id=tp.trainer_id
    JOIN pokemon p on tp.pokemon_id=p.id
    join pokemon_species ps on p.pokemon_species_id = ps.id
WHERE t.name = 'Brock'
order by tp.captured_at DESC -- DESC to order descending, if not default is ASC
-- If the order is ASC, the first pokemon will be returned instead of the last one
LIMIT 1;