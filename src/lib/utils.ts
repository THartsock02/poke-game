import { PokemonStat, PokemonClient, Pokemon } from "pokenode-ts";
import { PokemonDTO } from "./PokemonDTO";

export function findStatValueByName(stat_name: string, stats: PokemonStat[]) {
  const stat = stats.find((s) => s.stat.name == stat_name);
  if (stat) {
    console.log(stat_name + ": " + stat.base_stat);
    return stat.base_stat;
  }
}

export async function getRandomPokemon() {
  const id = await getRandomPokemonId();

  const response = await fetch("/api/pokemon/" + id, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();

  return data as PokemonDTO;
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

export function initializeScore(): Score {
  const score: Score = {
    stats: [
      { key: "speed", value: 0, pokemon: undefined },
      { key: "attack", value: 0, pokemon: undefined },
      { key: "hp", value: 0, pokemon: undefined },
      { key: "defense", value: 0, pokemon: undefined },
      { key: "specialAttack", value: 0, pokemon: undefined },
      { key: "specialDefense", value: 0, pokemon: undefined },
    ],
  };
  return score;
}
