"use client";

import { useDisclosure } from "@mantine/hooks";
import { getRandomPokemon, initializeScore } from "@/lib/utils";
import React, { useState } from "react";

import StatOption from "./stat-option";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Container,
  Modal,
  Group,
  Image,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { PokemonDTO } from "@/lib/PokemonDTO";
import { useForm } from "@mantine/form";

export default function MainPage() {
  const [counter, setCounter] = useState(0);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonDTO>();
  const [currentStatGuess, setCurrentStatGuess] = useState("");

  const [opened, { open, close }] = useDisclosure(false);
  const [finalScoreOpened, setFinalScoreOpened] = useState(false);

  const [score, setScore] = useState<Score>(initializeScore());

  const [showRestartButton, setShowRestartButton] = useState(false);

  const stats: Stat[] = [
    { id: 1, key: "hp", name: "HP" },
    { id: 2, key: "attack", name: "Attack" },
    { id: 3, key: "defense", name: "Defense" },
    { id: 4, key: "specialAttack", name: "Sp. Attack" },
    { id: 5, key: "specialDefense", name: "Sp. Defense" },
    { id: 6, key: "speed", name: "Speed" },
  ];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      guess: "",
    },
  });

  async function nextPokemon() {
    if (pokemonIndex < 6) {
      setPokemonIndex(pokemonIndex + 1);
      const pokemon = await getRandomPokemon();
      if (pokemon) {
        setCurrentPokemon(pokemon);
      }
    } else {
      setFinalScoreOpened(true);
    }
  }

  async function startClicked() {
    setPokemonIndex(1);
    setCounter(0);
    // setScore()
    const pokemon = await getRandomPokemon();
    // console.log(pokemon.attack);
    if (pokemon) setCurrentPokemon(pokemon);
  }

  async function restartClicked() {
    setFinalScoreOpened(false);
    setShowRestartButton(false);
    setPokemonIndex(0);
    setCounter(0);
    setCurrentPokemon(undefined);
    resetScore();
  }

  async function handleGuess(guess: string) {
    close();
    form.setValues({
      guess: undefined,
    });
    const statName = currentStatGuess;

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
        if (baseStat == +guess) {
          score.bonus += 5;
        }
        setCounter(counter + baseStat);
        currentStat.value = baseStat;
        currentStat.pokemon = currentPokemon.pokemonName;
        nextPokemon();
      }
    }
    checkScore();
  }

  async function handleClick(statName: string) {
    setCurrentStatGuess(statName);
    open();
  }

  function resetScore() {
    score.bonus = 0;
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
          <Text size="xs">BONUS: {score.bonus}</Text>
          <Text size="xs">TOTAL: {score.bonus + counter}</Text>
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
      <Modal
        opened={opened}
        onClose={close}
        title="Guess Stat"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={form.onSubmit((values) => handleGuess(values.guess))}>
          <TextInput
            data-autofocus
            withAsterisk
            label="Guess"
            placeholder=""
            key={form.key("guess")}
            {...form.getInputProps("guess")}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <Modal
        opened={finalScoreOpened}
        onClose={() => setFinalScoreOpened(false)}
        title="Game Over"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Text size="xs">Final Score: {score.bonus + counter}</Text>
        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => restartClicked()}
        >
          RESTART
        </Button>
        {/* <form onSubmit={form.onSubmit((values) => handleGuess(values.guess))}>
          <TextInput
            withAsterisk
            label="Guess"
            placeholder=""
            key={form.key("guess")}
            {...form.getInputProps("guess")}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form> */}
      </Modal>
    </Center>
  );
}
