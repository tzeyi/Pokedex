import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, json } from "@remix-run/react";
import { getPokemonById} from "~/server";
import invariant from "tiny-invariant";

export const loader = async ( { params } : LoaderFunctionArgs) => {
    invariant(params.id, "Missing id param");  // Error Check
    const id = Number(params.id)
    const pokemon = await getPokemonById(id);

    if (!pokemon) {
        throw new Response("Not Found", { status: 404 })
    }

    return pokemon
}


export default function PokemonPage() {
    const pokemon= useLoaderData<typeof loader>();

    return (
        <section className = "max-w-lg mx-auto">
            <h1 className = "text-2x1 font-bold my-4"> {pokemon.name} </h1>
            <p> JSON.stringify(pokemon)</p>

            <div className="flex flex-col">
                <div className="flex-1">
                    <img src = {pokemon.sprite.sprites} ></img>  
                </div>
                {/* <div className="flex-1">
                    {
                        {pokemon.type
                        
                        }
                    }
                </div> */}
            </div>

        </section>

    )
}