"use client";

import {
  findStatValueByName,
  getRandomPokemonId,
  initializeScore,
} from "@/lib/utils";
import React from "react";

import StatOption from "./stat-option";
import {
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

export default function TestPage() {
  const [counter, setCounter] = React.useState(0);
  const [pokemonIndex, setPokemonIndex] = React.useState(0);
  const [currentPokemon, setCurrentPokemon] = React.useState<Pokemon>();

  const [score, setScore] = React.useState<Score>(initializeScore());

  const [showRestartButton, setShowRestartButton] = React.useState(false);

  const stats: Stat[] = [
    { key: "speed", name: "Speed" },
    { key: "hp", name: "HP" },
    { key: "attack", name: "Attack" },
    { key: "defense", name: "Defense" },
    { key: "special-attack", name: "Special Attack" },
    { key: "special-defense", name: "Special Defense" },
  ];

  async function getRandomPokemn() {
    const id = await getRandomPokemonId();
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
    setCurrentPokemon(undefined);
    resetScore();
  }

  async function handleClick(statName: string) {
    if (currentPokemon) {
      const stats = score.stats;
      const currentStat = stats.find((s) => s.key === statName);
      const baseStat = findStatValueByName(statName, currentPokemon.stats);
      if (baseStat && currentStat) {
        setCounter(counter + baseStat);
        currentStat.value = baseStat;
        currentStat.pokemon = currentPokemon.name;
        nextPokemn();
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
          <Text size="xl">POINTS: {counter}</Text>
          <Text size="xl">TURN: {pokemonIndex}</Text>
        </Group>
      );
    }
  };
  return (
    <Center bg="var(--mantine-color-gray-light)">
      <Container strategy="grid" size={500}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs">
            {cardHeader()}
          </Card.Section>
          <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <div>
              {currentPokemon && (
                <>
                  <Text fw={700} size="xl">
                    {capitalize(currentPokemon.name)}
                  </Text>
                  <Image
                    radius="md"
                    src={currentPokemon.sprites.front_default!}
                    h={200}
                    w="auto"
                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  />
                </>
              )}

              {currentPokemon && (
                <>
                  {stats.map((stat) => {
                    return (
                      <>
                        <StatOption
                          key={stat.key}
                          statKey={stat.key}
                          statLabel={stat.name}
                          score={score}
                          handleStat={handleClick}
                        />
                        <Space h="xs" />
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </Flex>
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
      </Container>
    </Center>
  );
}
