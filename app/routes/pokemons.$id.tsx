import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, json } from "@remix-run/react";
import { getPokemonById} from "~/server";
import invariant from "tiny-invariant";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Progress } from "~/components/ui/progress"
import {
    Card,
    CardContent,
    CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"

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
    console.log(pokemon)

    return (
        <main className = "max-w-lg mx-auto">
            <h1 className = "sfont-bold my-4"> pikachu </h1>
            <p> JSON.stringify(pokemon)</p>

            <section className="flex flex-row">
                    <div className="flex-1">
                        <img src = "https://i.pinimg.com/originals/bf/95/34/bf953419d76bf747cba69b55e6e03957.png" ></img>  
                    </div>

                    <div className="flex-1">
                        <div className="flex"> 
                            <h1 className="text-red-500"> Electric </h1>
                            <h1 className="text-yellow-500"> Fire </h1>
                        </div>

                        <div>
                            <h1> Base Experience: 400 </h1>
                            <h1> Height: 50 </h1>
                            <h1> Weight: 100</h1>
                        </div>

                        <div >
                            <Button className="bg-green-500"> Add </Button>
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
                            hp 78 <Progress value={33} /> <br/>
                            attack 70 <Progress value={33} /> <br/>
                            defense 84 <Progress value={33} /> <br/>
                            special attack 100 <Progress value={33} /> <br/>
                            special defense 80 <Progress value={33} />
                        </div>
                    </TabsContent>

                    <TabsContent value="moves">
                        <div className="flex flex-wrap">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="w-1/3 p-2">
                                    <Card>
                                        <CardTitle> MegaPunch</CardTitle>
                                        <CardContent>
                                            <p>Level 0</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                </Tabs>
            </section>

        </main>

    )
}