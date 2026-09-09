import { PokemonStat, PokemonClient, Pokemon } from "pokenode-ts";
import { PokemonDTO } from "./PokemonDTO";

export function findStatValueByName(stat_name: string, stats: PokemonStat[]) {
  const stat = stats.find((s) => s.stat.name == stat_name);
  if (stat) {
    console.log(stat_name + ": " + stat.base_stat);
    return stat.base_stat;
  }
}

export async function getRandomPokemon(
  start_id: number,
  end_id: number,
): Promise<PokemonDTO | undefined> {
  const id = await getRandomPokemonId(start_id, end_id);

  const response = await fetch("/api/pokemon/" + id, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();

  return data as PokemonDTO;
}

export async function getRandomPokemonId(min: number, max: number) {
  console.log("min: " + min);
  console.log("max: " + max);
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log("random id: " + id);
  return id;
  // return (await Math.floor(Math.random() * 988)) + 1;
}

export function initializeScore(): Score {
  const score: Score = {
    bonus: 0,
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
