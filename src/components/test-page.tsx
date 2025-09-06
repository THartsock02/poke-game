// "use client";

// import { findStatValueByName } from "@/lib/utils";
// import { Pokemon } from "pokenode-ts";
// import React, { useEffect } from "react";
// import Image from "next/image";

// interface TestPageProps {
//   pokemon: Pokemon[];
// }

// export default function TestPage() {
//   const [counter, setCounter] = React.useState(0);

//   const [selectedHP, setSelectedHP] = React.useState(0);
//   const [selectedAttack, setSelectedAttack] = React.useState(0);
//   const [selectedDefense, setSelectedDefense] = React.useState(0);
//   const [selectedSpecialAttack, setSelectedSpecialAttack] = React.useState(0);
//   const [selectedSpecialDefense, setSelectedSpecialDefense] = React.useState(0);
//   const [selectedSpeed, setSelectedSpeed] = React.useState(0);

//   const [pokemonIndex, setPokemonIndex] = React.useState(0);

//   const [currentPokemon, setCurrentPokemon] = React.useState(
//     props.pokemon[pokemonIndex]
//   );

//   async function handleClick(statName: string) {
//     const baseStat = findStatValueByName(statName, currentPokemon.stats);
//     if (baseStat && baseStat != undefined) {
//       setCounter(counter + baseStat);
//       switch (statName) {
//         case "hp":
//           setSelectedHP(baseStat);
//           break;
//         case "attack":
//           setSelectedAttack(baseStat);
//           break;
//         case "special-attack":
//           setSelectedSpecialAttack(baseStat);
//           break;
//         case "special-defense":
//           setSelectedSpecialDefense(baseStat);
//           break;
//         case "defense":
//           setSelectedDefense(baseStat);
//           break;
//         case "speed":
//           setSelectedSpeed(baseStat);
//           break;

//         default:
//           break;
//       }
//     }
//   }

//   useEffect(() => {
//     if (pokemonIndex < 6) {
//       //   console.log(pokemonIndex);
//       const next = pokemonIndex + 1;
//       setPokemonIndex(next);
//       //   console.log(pokemonIndex);
//       setCurrentPokemon(props.pokemon[pokemonIndex]);
//       //   console.log(currentPokemon);
//     } else {
//       console.log("End of game");
//     }
//   }, [
//     selectedHP,
//     selectedAttack,
//     selectedDefense,
//     selectedSpecialAttack,
//     selectedSpecialDefense,
//     selectedSpeed,
//   ]);

//   function resetClicked() {
//     setCounter(0);
//   }

//   function capitalize(s: string) {
//     return s && String(s[0]).toUpperCase() + String(s).slice(1);
//   }
//   return (
//     <div>
//       <h1>COUNTER: {counter}</h1>

//       <h1>{capitalize(currentPokemon.name)}</h1>
//       <Image
//         src={currentPokemon.sprites.front_shiny!}
//         width={200}
//         height={200}
//         alt="Picture of the randomly selected pokemon"
//       />

//       <ul>
//         <li key={"hp"}>
//           HP: {selectedHP}
//           {"\t\t"}
//           <button disabled={selectedHP > 0} onClick={() => handleClick("hp")}>
//             CHOOSE
//           </button>
//         </li>
//         <li key={"attack"}>
//           Attack: {selectedAttack}
//           {"\t\t"}
//           <button
//             disabled={selectedAttack > 0}
//             onClick={() => handleClick("attack")}
//           >
//             CHOOSE
//           </button>
//         </li>
//         <li key={"defense"}>
//           Defense: {selectedDefense}
//           {"\t\t"}
//           <button
//             disabled={selectedDefense > 0}
//             onClick={() => handleClick("defense")}
//           >
//             CHOOSE
//           </button>
//         </li>
//         <li key={"special-attack"}>
//           Special Attack: {selectedSpecialAttack}
//           {"\t\t"}
//           <button
//             disabled={selectedSpecialAttack > 0}
//             onClick={() => handleClick("special-attack")}
//           >
//             CHOOSE
//           </button>
//         </li>
//         <li key={"special-defense"}>
//           Special Defense: {selectedSpecialDefense}
//           {"\t\t"}
//           <button
//             disabled={selectedSpecialDefense > 0}
//             onClick={() => handleClick("special-defense")}
//           >
//             CHOOSE
//           </button>
//         </li>
//         <li key={"speed"}>
//           Speed: {selectedSpeed}
//           {"\t\t"}
//           <button
//             disabled={selectedSpeed > 0}
//             onClick={() => handleClick("speed")}
//           >
//             CHOOSE
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }
