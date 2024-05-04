import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, json } from "@remix-run/react";
import { getPokemonById} from "~/server";
import invariant from "tiny-invariant";

export const loader = async ( { params } : LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");  // Error Check
    const id = Number(params.id)
    const pokemon = await getPokemonById(id);

    if (!pokemon) {
        throw new Response("Not Found", { status: 404 })
    }

    return pokemon
}

export default function PokemonPage() {
    const pokemon = useLoaderData<typeof loader>();

    return (
        <div>
            <p> Name: {pokemon.name} </p>
            <pre> { JSON.stringify(pokemon, null, 2) }</pre>
            <img src = {pokemon.sprite.sprites} ></img>
        </div>

    )
}