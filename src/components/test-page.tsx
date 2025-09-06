"use client";

import { findStatValueByName, getRandomPokemonId } from "@/lib/utils";
import React, { useEffect } from "react";
import Image from "next/image";
import EndGameModal from "./EndGameModal";

export default function TestPage() {
  const [counter, setCounter] = React.useState(0);
  const [pokemonIndex, setPokemonIndex] = React.useState(1);

  const [selectedHP, setSelectedHP] = React.useState(0);
  const [selectedAttack, setSelectedAttack] = React.useState(0);
  const [selectedDefense, setSelectedDefense] = React.useState(0);
  const [selectedSpecialAttack, setSelectedSpecialAttack] = React.useState(0);
  const [selectedSpecialDefense, setSelectedSpecialDefense] = React.useState(0);
  const [selectedSpeed, setSelectedSpeed] = React.useState(0);
  const [showEndModal, setShowEndModal] = React.useState(false);

  const [currentPokemon, setCurrentPokemon] = React.useState<Pokemon>();

  async function getRandomPokemn() {
    const id = await getRandomPokemonId();
    console.log("random id: " + id);
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as Pokemon;
  }

  async function nextClicked() {
    setPokemonIndex(pokemonIndex + 1);

    console.log("NEXT CLICKED");
    const pokemon = await getRandomPokemn();
    if (pokemon) {
      setCurrentPokemon(pokemon);
    }
  }

  async function startClicked() {
    const pokemon = await getRandomPokemn();
    if (pokemon) setCurrentPokemon(pokemon);
  }

  async function handleClick(statName: string) {
    if (currentPokemon) {
      const baseStat = findStatValueByName(statName, currentPokemon.stats);
      if (baseStat) {
        setCounter(counter + baseStat);
        switch (statName) {
          case "hp":
            setSelectedHP(baseStat);
            break;
          case "attack":
            setSelectedAttack(baseStat);
            break;
          case "special-attack":
            setSelectedSpecialAttack(baseStat);
            break;
          case "special-defense":
            setSelectedSpecialDefense(baseStat);
            break;
          case "defense":
            setSelectedDefense(baseStat);
            break;
          case "speed":
            setSelectedSpeed(baseStat);
            break;

          default:
            break;
        }
      }
    }
  }

  useEffect(() => {
    console.log("In use effect");
    console.log("selectedHP: " + selectedHP);
    console.log("selectedAttack: " + selectedAttack);
    console.log("selectedDefense: " + selectedDefense);
    console.log("selectedSpecialAttack: " + selectedSpecialAttack);
    console.log("selectedSpecialDefense: " + selectedSpecialDefense);
    console.log("selectedSpeed: " + selectedSpeed);
    if (
      selectedHP > 0 &&
      selectedAttack > 0 &&
      selectedDefense > 0 &&
      selectedSpecialAttack > 0 &&
      selectedSpecialDefense > 0 &&
      selectedSpeed > 0
    ) {
      console.log("End of game");
      setShowEndModal(true);
    }
  }, [
    selectedHP,
    selectedAttack,
    selectedDefense,
    selectedSpecialAttack,
    selectedSpecialDefense,
    selectedSpeed,
  ]);

  function capitalize(s: string) {
    return s && String(s[0]).toUpperCase() + String(s).slice(1);
  }
  return (
    <div>
      <button onClick={() => startClicked()}>START</button>
      <button onClick={() => nextClicked()}>NEXT</button>

      <h1>TURN: {pokemonIndex}</h1>
      <h1>POINTS: {counter}</h1>

      {currentPokemon && (
        <>
          <h1>{capitalize(currentPokemon.name)}</h1>
          <Image
            src={currentPokemon.sprites.front_shiny!}
            width={200}
            height={200}
            alt="Picture of the randomly selected pokemon"
          />
        </>
      )}

      <ul>
        <li key={"hp"}>
          HP: {selectedHP}
          {"\t\t"}
          <button disabled={selectedHP > 0} onClick={() => handleClick("hp")}>
            CHOOSE
          </button>
        </li>
        <li key={"attack"}>
          Attack: {selectedAttack}
          {"\t\t"}
          <button
            disabled={selectedAttack > 0}
            onClick={() => handleClick("attack")}
          >
            CHOOSE
          </button>
        </li>
        <li key={"defense"}>
          Defense: {selectedDefense}
          {"\t\t"}
          <button
            disabled={selectedDefense > 0}
            onClick={() => handleClick("defense")}
          >
            CHOOSE
          </button>
        </li>
        <li key={"special-attack"}>
          Special Attack: {selectedSpecialAttack}
          {"\t\t"}
          <button
            disabled={selectedSpecialAttack > 0}
            onClick={() => handleClick("special-attack")}
          >
            CHOOSE
          </button>
        </li>
        <li key={"special-defense"}>
          Special Defense: {selectedSpecialDefense}
          {"\t\t"}
          <button
            disabled={selectedSpecialDefense > 0}
            onClick={() => handleClick("special-defense")}
          >
            CHOOSE
          </button>
        </li>
        <li key={"speed"}>
          Speed: {selectedSpeed}
          {"\t\t"}
          <button
            disabled={selectedSpeed > 0}
            onClick={() => handleClick("speed")}
          >
            CHOOSE
          </button>
        </li>
      </ul>
      {<EndGameModal score={counter} />}
    </div>
  );
}
