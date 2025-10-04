import { PokemonDTO } from "@/lib/PokemonDTO";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   pokemon: PokemonDTO;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log(id);
  // res.status(200).json({ message: "Hello from Next.js!" });
  if (id && typeof id === "string") {
    const prisma = new PrismaClient();
    const id_number = Number(id);
    const result = await prisma.pokemon.findMany({
      where: {
        id: id_number,
      },
    });
    const pokemonDb = result[0];
    if (pokemonDb) {
      res.status(200).json({
        id: pokemonDb.id,
        pokemonName: pokemonDb.pokemonname,
        hp: pokemonDb.hp,
        attack: pokemonDb.attack,
        defense: pokemonDb.defense,
        specialAttack: pokemonDb.specialattack,
        specialDefense: pokemonDb.specialdefense,
        speed: pokemonDb.speed,
      });
    }
  }
}
