"use client";

import { findStatValueByName, getRandomPokemonId } from "@/lib/utils";
import React, { useEffect } from "react";
import Image from "next/image";
import EndGameModal from "./EndGameModal";

export default function TestPage() {
  const [counter, setCounter] = React.useState(0);
  const [pokemonIndex, setPokemonIndex] = React.useState(0);

  const [selectedHP, setSelectedHP] = React.useState(0);
  const [selectedAttack, setSelectedAttack] = React.useState(0);
  const [selectedDefense, setSelectedDefense] = React.useState(0);
  const [selectedSpecialAttack, setSelectedSpecialAttack] = React.useState(0);
  const [selectedSpecialDefense, setSelectedSpecialDefense] = React.useState(0);
  const [selectedSpeed, setSelectedSpeed] = React.useState(0);
  const [showRestartButton, setShowRestartButton] = React.useState(false);

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

  async function nextPokemn() {
    setPokemonIndex(pokemonIndex + 1);

    console.log("NEXT CLICKED");
    console.log(pokemonIndex);
    if (pokemonIndex < 6) {
      const pokemon = await getRandomPokemn();
      if (pokemon) {
        setCurrentPokemon(pokemon);
      }
    }
  }

  async function startClicked() {
    setPokemonIndex(1);
    setCounter(0);
    const pokemon = await getRandomPokemn();
    if (pokemon) setCurrentPokemon(pokemon);
  }

  async function restartClicked() {
    setShowRestartButton(false);
    setPokemonIndex(0);
    setCounter(0);
    setSelectedHP(0);
    setSelectedAttack(0);
    setSelectedDefense(0);
    setSelectedSpecialAttack(0);
    setSelectedSpecialDefense(0);
    setSelectedSpeed(0);
    setCurrentPokemon(undefined);
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
        nextPokemn();
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
      setShowRestartButton(true);
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
      {pokemonIndex == 0 && (
        <button onClick={() => startClicked()}>START</button>
      )}
      {pokemonIndex > 0 && pokemonIndex <= 6 && (
        <div>
          {/* <button onClick={() => nextClicked()}>NEXT</button> */}
          <h1>TURN: {pokemonIndex}</h1>
        </div>
      )}
      {pokemonIndex > 0 && (
        <div>
          <h1>POINTS: {counter}</h1>
        </div>
      )}

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
      {currentPokemon && (
        <div>
          <ul>
            <li key={"hp"}>
              HP: {selectedHP}
              {"\t\t"}
              {selectedHP == 0 && (
                <button
                  disabled={selectedHP > 0}
                  onClick={() => handleClick("hp")}
                >
                  CHOOSE
                </button>
              )}
            </li>
            <li key={"attack"}>
              Attack: {selectedAttack}
              {"\t\t"}
              {selectedAttack == 0 && (
                <button
                  disabled={selectedAttack > 0}
                  onClick={() => handleClick("attack")}
                >
                  CHOOSE
                </button>
              )}
            </li>
            <li key={"defense"}>
              Defense: {selectedDefense}
              {"\t\t"}
              {selectedDefense == 0 && (
                <button
                  disabled={selectedDefense > 0}
                  onClick={() => handleClick("defense")}
                >
                  CHOOSE
                </button>
              )}
            </li>
            <li key={"special-attack"}>
              Special Attack: {selectedSpecialAttack}
              {"\t\t"}
              {selectedSpecialAttack == 0 && (
                <button
                  disabled={selectedSpecialAttack > 0}
                  onClick={() => handleClick("special-attack")}
                >
                  CHOOSE
                </button>
              )}
            </li>
            <li key={"special-defense"}>
              Special Defense: {selectedSpecialDefense}
              {"\t\t"}
              {selectedSpecialDefense == 0 && (
                <button
                  disabled={selectedSpecialDefense > 0}
                  onClick={() => handleClick("special-defense")}
                >
                  CHOOSE
                </button>
              )}
            </li>
            <li key={"speed"}>
              Speed: {selectedSpeed}
              {"\t\t"}
              {selectedSpeed == 0 && (
                <button
                  disabled={selectedSpeed > 0}
                  onClick={() => handleClick("speed")}
                >
                  CHOOSE
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
      {showRestartButton && (
        <button onClick={() => restartClicked()}>RESTART</button>
      )}
    </div>
  );
}
