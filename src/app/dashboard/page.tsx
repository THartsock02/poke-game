import { PokemonClient, PokemonStat } from "pokenode-ts";
import Image from "next/image";
import StatButton from "components/stat-button";
import React from "react";

// Select Pokemon Generations
// Current Gens
// Generation I Pokémon: #0001 Bulbasaur - #0151 Mew
// Generation II Pokémon: #0152 Chikorita - #0251 Celebi
// Generation III Pokémon: #0252 Treecko - #0386 Deoxys
// Generation IV Pokémon: #0387 Turtwig - #0493 Arceus
// Generation V Pokémon: #0494 Victini - #0649 Genesect
// Generation VI Pokémon: #0650 Chespin - #0721 Volcanion
// Generation VII Pokémon: #0722 Rowlet - #0809 Melmetal
// Generation VIII Pokémon: #0810 Grookey - #0905 Enamorus
// Generation IX Pokémon: #0906 Sprigatito - #1025 Pecharunt

// Steps
// 1. Select gens
// 2. get random pokemon from selected gens
// 3. User selects lower than 300 or higher than 600
// 4. User selects from stats
//      hp, attack, sp. attack, defense, sp. defense, speed
// 5. User guesses stat
// Repeat 2-5 5 more times for each stat

function getRandomPokemonId() {
  return Math.floor(Math.random() * 492) + 1;
}

function findStatValueByName(stat_name: string, stats: PokemonStat[]) {
  const stat = stats.find((s) => s.stat.name == stat_name);
  if (stat) {
    console.log(stat_name + ": " + stat.base_stat);
  }
}

export default async function Dashboard() {
  const [counter, setCounter] = React.useState(0);

  const api = new PokemonClient();
  const randomPokemanId = getRandomPokemonId();
  console.log(randomPokemanId);
  const pokemon = await api
    .getPokemonById(randomPokemanId)
    .catch(() => console.log("Oops!"));

  if (pokemon) {
    // console.log(pokemon);
    // console.log(pokemon.stats[0].stat.name);
    // console.log(pokemon.stats[0].base_stat);

    return (
      <div>
        <h1>{counter}</h1>
        <h1>Pokemans</h1>
        <h2>{pokemon.name}</h2>
        <Image
          src={pokemon.sprites.front_shiny!}
          width={200}
          height={200}
          alt="Picture of the randomly selected pokemon"
        />
        <StatButton
          label="HP"
          statName="hp"
          stats={pokemon.stats}
          onClick={() => findStatValueByName("hp", pokemon.stats)}
        />
        <StatButton
          label="Speed"
          statName="speed"
          stats={pokemon.stats}
          onClick={() => findStatValueByName("speed", pokemon.stats)}
        />
        <StatButton
          label="Attack"
          statName="attack"
          stats={pokemon.stats}
          onClick={() => findStatValueByName("attack", pokemon.stats)}
        />
        <StatButton
          label="Special Attack"
          statName="special-attack"
          stats={pokemon.stats}
          onClick={() => findStatValueByName("special-attack", pokemon.stats)}
        />
        <StatButton
          label="Defense"
          statName="defense"
          stats={pokemon.stats}
          onClick={() => findStatValueByName("defense", pokemon.stats)}
        />
        <StatButton
          label="Special Defense"
          statName="special-defense"
          stats={pokemon.stats}
          onClick={() => findStatValueByName("special-defense", pokemon.stats)}
        />
      </div>
    );
  }
}
