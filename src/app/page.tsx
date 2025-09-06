// import TestPage from "components/test-page";
// import { getRandomPokemonId, getSixRandomPokemon } from "@/lib/utils";
// import { revalidatePath } from "next/cache";

import { getRandomPokemonId } from "@/lib/utils";

// export default async function Home() {
// for (let i = 0; i < 6; i++) {
//   const randomPokemanId = await getRandomPokemonId();
//   console.log("random id: " + randomPokemanId);
// }
// return <> {<TestPage />}</>;
// return <></>;
// }
export default async function Home() {
  const randomPokemanId = await getRandomPokemonId();
  console.log("random id: " + randomPokemanId);
  const pokemon = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + randomPokemanId
  ).then((res) => res.json());
  console.log(pokemon.name);
  return (
    <div>
      <h1>Random Pokemon</h1>
      <h3>{pokemon.name}</h3>
    </div>
  );
}
