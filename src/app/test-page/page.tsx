import TestPage from "components/test-page";
import { getRandomPokemonId, getSixRandomPokemon } from "@/lib/utils";

export default async function HomePage() {
  const pokemon = await getSixRandomPokemon();
  return <> {pokemon && <TestPage pokemon={pokemon} />}</>;
}
