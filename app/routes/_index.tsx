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
  useSubmit,
  NavLink
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
  const query = q + "%"
  const pokemons = await getPokemonsByName(query);

  return json({ pokemons, q });
};

 
export default function Index() {
  const { pokemons, q } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col p-3">
      <section className="flex">
        <h1 className="text-3xl px-3 font-bold text-red-600"> Pokedex </h1>
        <div className="flex-grow">
          <SearchBar></SearchBar>
        </div>
        <span className="px-20"></span>
      </section>

      <section>
        <h1> Pokemon Owned </h1>
      </section>

      <Outlet></Outlet>
    </main>
  );
}

// Search Bar
function SearchBar() {
  const { pokemons, q } = useLoaderData<typeof loader>();
  const submit = useSubmit()

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
    console.log(q)
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

      <nav>
      {pokemons.length ? (
          <ul>
            {pokemons.map((pokemon) => (
              <li key={pokemon.id}>
                <NavLink to={`pokemons/${pokemon.id}`}>
                  <>
                    {pokemon.name}
                  </>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No such Pokemon</i>
          </p>
        )}
        </nav>
    </>

  );
}
