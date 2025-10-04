"use client";

import {
  findStatValueByName,
  getRandomPokemon,
  initializeScore,
} from "@/lib/utils";
import React from "react";

import StatOption from "./stat-option";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Image,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { PokemonDTO } from "@/lib/PokemonDTO";

export default function MainPage() {
  const [counter, setCounter] = React.useState(0);
  const [pokemonIndex, setPokemonIndex] = React.useState(0);
  const [currentPokemon, setCurrentPokemon] = React.useState<PokemonDTO>();

  const [score, setScore] = React.useState<Score>(initializeScore());

  const [showRestartButton, setShowRestartButton] = React.useState(false);

  const stats: Stat[] = [
    { id: 1, key: "hp", name: "HP" },
    { id: 2, key: "attack", name: "Attack" },
    { id: 3, key: "defense", name: "Defense" },
    { id: 4, key: "specialAttack", name: "Sp. Attack" },
    { id: 5, key: "specialDefense", name: "Sp. Defense" },
    { id: 6, key: "speed", name: "Speed" },
  ];

  async function nextPokemon() {
    setPokemonIndex(pokemonIndex + 1);

    if (pokemonIndex < 6) {
      const pokemon = await getRandomPokemon();
      if (pokemon) {
        setCurrentPokemon(pokemon);
      }
    }
  }

  async function startClicked() {
    setPokemonIndex(1);
    setCounter(0);
    const pokemon = await getRandomPokemon();
    // console.log(pokemon.attack);
    if (pokemon) setCurrentPokemon(pokemon);
  }

  async function restartClicked() {
    setShowRestartButton(false);
    setPokemonIndex(0);
    setCounter(0);
    setCurrentPokemon(undefined);
    resetScore();
  }

  async function handleClick(statName: string) {
    console.log(statName);
    if (currentPokemon) {
      const stats = score.stats;
      const currentStat = stats.find((s) => s.key === statName);
      // const baseStat = findStatValueByName(statName, currentPokemon.stats);

      let dynamicKey = statName as keyof PokemonDTO;

      let myDynamicPropValue = currentPokemon[dynamicKey];
      console.log(myDynamicPropValue);
      const baseStat = myDynamicPropValue;
      if (baseStat && typeof baseStat === "number" && currentStat) {
        setCounter(counter + baseStat);
        currentStat.value = baseStat;
        currentStat.pokemon = currentPokemon.pokemonName;
        nextPokemon();
      }
    }
    checkScore();
  }

  function resetScore() {
    score.stats.forEach((s) => {
      s.pokemon = undefined;
      s.value = 0;
    });
  }

  function checkScore() {
    let allOverZero = true;
    score.stats.forEach((s) => {
      if (s.value == 0) {
        allOverZero = false;
      }
    });
    setShowRestartButton(allOverZero);
  }

  function capitalize(s: string) {
    return s && String(s[0]).toUpperCase() + String(s).slice(1);
  }

  const cardHeader = () => {
    if (pokemonIndex == 0) {
      return (
        <Group>
          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => startClicked()}
          >
            START
          </Button>
        </Group>
      );
    } else {
      return (
        <Group justify="flex-start">
          <Text size="xs">POINTS: {counter}</Text>
          <Text size="xs">TURN: {pokemonIndex}</Text>
        </Group>
      );
    }
  };
  return (
    <Center>
      <Container mt="xs" strategy="grid" size={500}>
        <Box w={{ base: 400, sm: 400, lg: 500 }} mx="auto">
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            w={{ sm: 400, lg: 500 }}
            // style={{ width: "500px" }}
          >
            <Card.Section withBorder inheritPadding py="xs">
              {cardHeader()}
            </Card.Section>
            {currentPokemon && (
              <>
                <Text fw={700} size="xs">
                  {capitalize(currentPokemon.pokemonName)}
                </Text>
                <AspectRatio mx="auto">
                  <Image
                    radius="md"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`}
                    h={200}
                    w="auto"
                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  />
                </AspectRatio>
              </>
            )}

            {currentPokemon && (
              <>
                {stats.map((stat) => {
                  return (
                    <div key={stat.key}>
                      <StatOption
                        statKey={stat.key}
                        statLabel={stat.name}
                        score={score}
                        handleStat={handleClick}
                      />
                      <Space h="xs" />
                    </div>
                  );
                })}
              </>
            )}

            {showRestartButton && (
              <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => restartClicked()}
              >
                RESTART
              </Button>
            )}
          </Card>
        </Box>
      </Container>
    </Center>
  );
}
