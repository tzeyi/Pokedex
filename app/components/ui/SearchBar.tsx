import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Input } from "~/components/ui/input"

import { getPokemonsByName } from "~/server";
import { 
        Form,
        useLoaderData,
        useSubmit 
} from "@remix-run/react";

import { Pokemon } from "~/model/Pokemon";
import { useEffect } from "react";


export const loader = async ({
  request,
} : LoaderFunctionArgs) => {
const url = new URL(request.url);
const q = url.searchParams.get("q");

const pokemons = await getPokemonsByName(q!);
return json({ pokemons, q });
};

export default function SearchBar() {
  const { pokemons, q } = useLoaderData<typeof loader>()
  const submit = useSubmit()

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <div>
      <Form 
        id="search-form" 
        onChange={(event) => {
          const isFirstSearch = q === null;
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }}
        role="search"
      >
        <Input type="input" placeholder="Search"></Input>
      </Form>
    </div>
  );
}