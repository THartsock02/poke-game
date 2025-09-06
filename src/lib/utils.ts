import { PokemonStat, PokemonClient, Pokemon } from "pokenode-ts";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

export function findStatValueByName(stat_name: string, stats: PokemonStat[]) {
  const stat = stats.find((s) => s.stat.name == stat_name);
  if (stat) {
    console.log(stat_name + ": " + stat.base_stat);
    return stat.base_stat;
  }
}

export async function getRandomPokemonId() {
  return (await Math.floor(Math.random() * 492)) + 1;
}

export async function getSixRandomPokemon() {
  const api = new PokemonClient({
    cacheOptions: {
      ttl: 60,
      interpretHeader: true,
      etag: true,
      cacheTakeover: true,
    },
    logs: true,
  });

  const pokemon: Pokemon[] = [];

  for (let i = 0; i < 6; i++) {
    const randomPokemanId = await getRandomPokemonId();
    // console.log("random id: " + randomPokemanId);
    const randomPokemon = await api
      .getPokemonById(randomPokemanId)
      .catch(() => console.log("Oops!"));
    if (randomPokemon && randomPokemon != undefined)
      pokemon.push(randomPokemon);
  }

  return pokemon;
}
