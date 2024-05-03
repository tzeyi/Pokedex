import type { MetaFunction } from "@remix-run/node";
import SearchBar from "~/components/ui/SearchBar";
import { json } from "@remix-run/node";
import { getAllPokemon } from "~/server";

import {
  Form,
  Link,
  Links,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Pokedex" },
    { name: "description", content: "Pokedex!" },
  ];
};

export const loader = async () => {
  const pokemon = await getAllPokemon();
  console.log(pokemon)
  return json({pokemon})
}
 

export default function Index() {
  const pokemon = useLoaderData<typeof loader>();
  // const data = JSON.stringify(pokemon);

  return (
    <div className="flex flex-col p-3">
      <div className="flex">
        <h1 className="text-3xl px-2 font-bold text-red-600"> Pokedex </h1>
        <SearchBar></SearchBar>
      </div>

      <p> { JSON.stringify(pokemon) } </p>
    </div>
  );
}
