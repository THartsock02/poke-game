import TestPage from "components/test-page";
import { getSixRandomPokemon } from "@/lib/utils";

export default async function Home() {
  const pokemon = await getSixRandomPokemon();
  return <> {pokemon && <TestPage pokemon={pokemon} />}</>;
}
