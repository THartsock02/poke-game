"use client";

import { PokemonStat } from "pokenode-ts";
import { Button } from "@mantine/core";

function findStatValueByName(statName: string, stats: PokemonStat[]) {
  const stat = stats.find((s) => s.stat.name == statName);
  if (stat) {
    console.log(statName + ": " + stat.base_stat);
  }
}

interface StatButtonProps {
  label: string;
  statName: string;
  stats: PokemonStat[];
  onClick: any;
}

export default function StatButton(props: StatButtonProps) {
  const { statName, stats, label } = props;
  return (
    <Button variant="filled" color="indigo">
      Button
    </Button>
    // <div>
    //   <Button
    //     variant="filled"
    //     color="indigo"
    //     onClick={() => findStatValueByName(statName, stats)}
    //   >
    //     {label}
    //   </Button>
    //   {/* <PokeButton onClick={() => findStatValueByName(statName, stats)}>
    //     {label}
    //   </PokeButton> */}
    // </div>
  );
}
