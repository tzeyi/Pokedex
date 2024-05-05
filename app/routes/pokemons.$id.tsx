import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, json, Form } from "@remix-run/react";
import { createPokemon, getPokemonById} from "~/server";
import invariant from "tiny-invariant";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Progress } from "~/components/ui/progress"
import {
    Card,
    CardContent,
    CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { typeColors } from "~/model/typeColors";


export const action = async() => {
    const contact = await createPokemon()
    return json({ contact })
}

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
        <main className = "max-w-lg mx-auto">
            <h1 className = "sfont-bold my-4"> {pokemon.name} </h1>

            <section className="flex flex-row">
                    <div className="flex-1">
                        <img src = {pokemon.sprite.sprites} ></img>  
                    </div>

                    <div className="flex-1">
                        <div className="flex"> 
                            {pokemon.type.map((type) =>
                                <Badge variant="outline" 
                                        className={`text-${typeColors[type.pokemon_v2_type.name as keyof typeof typeColors]} 
                                                    border-${typeColors[type.pokemon_v2_type.name as keyof typeof typeColors]} 
                                                    mx-5`}
                                        >
                                            {type.pokemon_v2_type.name}
                                        </Badge>
                            )}
                        </div>

                        <div>
                            <h1> Base Experience: {pokemon.base_experience} </h1>
                            <h1> Height: {pokemon.height} </h1>
                            <h1> Weight: {pokemon.weight} </h1>
                        </div>

                        <div >
                            <Form method="post">
                                <Button type="submit" className="bg-green-500"> Add </Button>
                            </Form>
                            <Button variant="destructive">Remove</Button>
                        </div>
                    </div>
            </section>

            <section> 
                <Tabs defaultValue="stats" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="stats">Stats</TabsTrigger>
                        <TabsTrigger value="moves">Moves</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stats">
                        <div>
                            {pokemon.stats.nodes.map((stat) => 
                                    <div>
                                        <h1> {stat.pokemon_v2_stat.name} {stat.base_stat}</h1>
                                        <Progress value={stat.base_stat} />
                                        <br/>
                                    </div>
                                )}
                        </div>
                    </TabsContent>

                    <TabsContent value="moves">
                        <div className="flex flex-wrap">
                            {pokemon.moves.map((move) =>
                                <div key={move.pokemon_v2_move.name} className="w-1/3 p-2">
                                    <Card>
                                        <CardTitle> {move.pokemon_v2_move.name} </CardTitle>
                                        <CardContent>
                                            <p>Level {move.level}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                )
                            }
                        </div>
                    </TabsContent>

                </Tabs>
            </section>

        </main>

    )
}