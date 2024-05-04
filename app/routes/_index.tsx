import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
// import SearchBar from "~/components/ui/SearchBar";
import { json } from "@remix-run/node";
import { getPokemonsByName } from "~/server";
import { Input } from "~/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"


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

// export const loader = async ({
//   request,
// } : LoaderFunctionArgs) => {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q");
//   const query = q + "%"
//   const pokemons = await getPokemonsByName(query);

//   return json({ pokemons, q });
// };

 
export default function Index() {
  // const { pokemons, q } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col p-3">
      <section className="flex">
        <h1 className="text-3xl px-3 font-bold text-red-600"> Pokedex </h1>
        <div className="flex-grow">
          <SearchBar></SearchBar>
        </div>
        <span className="px-20"></span>
      </section>

      <section className="flex justify-center">
        <div className="w-4/5">
          <h1> Pokemon Owned </h1>
          <Table>
            <TableCaption>A list of your pokemon collection </TableCaption>
            <TableBody>
              {[...Array(7)].map((_, index) => (
                    <TableRow key={index}>
                      <NavLink to={`pokemons/1`} className="block w-full">
                        <TableCell className="font-medium">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/en/1/1f/Pok%C3%A9mon_Charizard_art.png"
                            className="w-auto h-auto max-w-20 max-h-20"
                            alt="Pokemon"
                          />
                        </TableCell>
                        <TableCell className="text-middle">
                          <div>
                            <h1>Charizard</h1>
                            <Badge variant="outline" className="text-red-500 border-red-500">Fire</Badge>
                            <Badge variant="outline" className="text-blue-500 border-blue-500">Fly</Badge>
                          </div>
                        </TableCell>
                      </NavLink>
                    </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Outlet />
    </main>
  );
}

// Search Bar
function SearchBar() {
  // const { pokemons, q } = useLoaderData<typeof loader>();
  // const submit = useSubmit()

  // useEffect(() => {
  //   const searchField = document.getElementById("q");
  //   if (searchField instanceof HTMLInputElement) {
  //     searchField.value = q || "";
  //   }
  //   console.log(q)
  // }, [q])

  return (
    <>
      <div>
        <Form 
          // onChange={(event) => {
          //   console.log(event)
          //   const isFirstSearch = q === null;
          //   submit(event.currentTarget, {
          //     replace: !isFirstSearch,
          //   });
          // }}
          // role="search"
        >
          <Input 
            type="search" 
            aria-label="Search pokemon"
            // defaultValue={q || ""}
            placeholder="Search"
            name="q"
          >
          </Input>
        </Form>
      </div>

      {/* <nav>
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
        </nav> */}
    </>

  );
}
