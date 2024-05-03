import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, json } from "@remix-run/react";
import { gql } from "graphql-request";
import { getPokemonById } from "~/server";

// Documentation:
// https://graphql-pokeapi.vercel.app/


export const loader = async ( { params } : LoaderFunctionArgs) => {
    const id = Number(params.id)
    const pokemon = await getPokemonById(id);

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