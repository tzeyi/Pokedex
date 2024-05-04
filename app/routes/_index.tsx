import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
// import SearchBar from "~/components/ui/SearchBar";
import { json } from "@remix-run/node";
import { getPokemonsByName } from "~/server";
import { Input } from "~/components/ui/input"

import {
  Form,
  Link,
  Links,
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useSubmit
} from "@remix-run/react";

import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Pokedex" },
    { name: "description", content: "Pokedex!" },
  ];
};

export const loader = async ({
  request,
} : LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const input = q + "%"
  const pokemons = await getPokemonsByName(input);

  return json({ pokemons, q });
};

 
export default function Index() {
  const { pokemons, q } = useLoaderData<typeof loader>();

  return (
    <main className="md:flex flex-col p-3">
      <section className="flex">
        <h1 className="text-3xl px-3 font-bold text-red-600"> Pokedex </h1>
        <div className="flex-grow">
          <SearchBar></SearchBar>
        </div>
        <span className="px-20"></span>
      </section>

      <section>

      </section>

      <Outlet></Outlet>
    </main>
  );
}

// Search Bar
function SearchBar() {
  const pokemons = useLoaderData<typeof loader>()
  const { q } = useLoaderData<typeof loader>()
  const submit = useSubmit()
  console.log(JSON.stringify(pokemons.pokemons))

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q])

  return (
    <>
      <div>
        <Form 
          onChange={(event) => {
            console.log(event)
            const isFirstSearch = q === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            });
          }}
          role="search"
        >
          <Input 
            type="search" 
            aria-label="Search pokemon"
            defaultValue={q || ""}
            placeholder="Search"
            name="q"
          >
          </Input>
        </Form>
      </div>

      <h1> { JSON.stringify(pokemons) } </h1>
    </>

  );
}
