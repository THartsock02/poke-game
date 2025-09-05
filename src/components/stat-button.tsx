"use client";

import { PokemonStat } from "pokenode-ts";
import { useState } from "react";

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
    <div>
      <button onClick={() => findStatValueByName(statName, stats)}>
        {label}
      </button>
    </div>
  );
}
