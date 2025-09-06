import TestPage from "components/test-page";
import { getRandomPokemonId, getSixRandomPokemon } from "@/lib/utils";
import { revalidatePath } from "next/cache";

revalidatePath("/");
export default async function Home() {
  for (let i = 0; i < 6; i++) {
    const randomPokemanId = await getRandomPokemonId();
    console.log("random id: " + randomPokemanId);
  }
  const pokemon = await getSixRandomPokemon();
  return <> {pokemon && <TestPage pokemon={pokemon} />}</>;
}
