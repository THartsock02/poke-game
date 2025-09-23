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
  res.status(200).json({ message: "Hello from Next.js!" });
  if (id && typeof id === "string") {
    const prisma = new PrismaClient();
    const id_number = Number(id);
    const result = await prisma.pokemon.findMany({
      where: {
        Id: id_number,
      },
    });
    const pokemonDb = result[0];
    if (pokemonDb) {
      res.status(200).json({
        pokemon: {
          id: pokemonDb.Id,
          pokemonName: pokemonDb.PokemonName,
          hp: pokemonDb.Hp,
          attack: pokemonDb.Hp,
          defense: pokemonDb.Hp,
          specialAttack: pokemonDb.Hp,
          specialDefense: pokemonDb.Hp,
          speed: pokemonDb.Hp,
          imageUrl: pokemonDb.ImageUrl,
        },
      });
    }
  }
}
