import type { MetaFunction } from "@remix-run/node";
import SearchBar from "~/components/ui/SearchBar";
import { json } from "@remix-run/node";
import { getPokemonAll } from "~/server";

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
  const pokemon = await getPokemonAll();
  return json({pokemon})
}
 
export default function Index() {
  const pokemon = useLoaderData<typeof loader>();
  // const data = JSON.stringify(pokemon);

  return (
    <main className="md:flex flex-col p-3">
      <section className="flex">
        <h1 className="text-3xl px-3 font-bold text-red-600"> Pokedex </h1>
        <div className="flex-grow">
          <SearchBar></SearchBar>
        </div>
        <span className="px-20"></span>
      </section>

      <section> </section>

    </main>
  );
}

