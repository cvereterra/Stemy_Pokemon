select t.name, count(tp.pokemon_id)
from trainer_pokedex tp join trainer t on tp.trainer_id = t.id
GROUP BY tp.trainer_id;