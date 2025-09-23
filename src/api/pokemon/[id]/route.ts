import { PokemonDTO } from "@/lib/PokemonDTO";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  pokemon: PokemonDTO;
};

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { idString } = req.query;
  console.log(idString);
  if (idString && typeof idString === "string") {
    const prisma = new PrismaClient();
    const id = Number(idString);
    const result = await prisma.pokemon.findMany({
      where: {
        Id: id,
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
