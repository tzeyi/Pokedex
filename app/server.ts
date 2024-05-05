import { GraphQLClient } from "graphql-request"
import { Pokemon, PokemonResponse, PokemonSearch } from "~/model/Pokemon";
import { queryPokemonById, queryPokemonByName } from './lib/query';

// Documentation:
// https://medium.com/@elijahbanjo/understanding-graphql-apis-from-a-rest-api-point-of-view-08196600c667 (REST vs GraphQL)
// https://www.apollographql.com/docs/apollo-server/getting-started (apollo server using query, mutations, resolvers)
// https://www.youtube.com/watch?v=F5rGkgHgAog (remix loader + graphql)

// Note: GraphQL & Rest APis can be used interchangeably
//       Mutation in graphQL can simulate POST/UPDATE requests
//       GraphQL use resolvers for server side functionalities

export const client = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta')

// REST Api
export async function getPokemonsByName(name: string) { // For search bar
  if (name != "") {
    name = name + "%"
  }

  const response: { pokemon_v2_pokemon: PokemonSearch[] } = await client.request(queryPokemonByName, {searchQuery: name}) 

  const cleanPokemon = response.pokemon_v2_pokemon.map(pokemon => ({
    'id': pokemon.id,
    'name': pokemon.name
  }))

  return cleanPokemon
}


export async function getPokemonById(id: number) {
  const response: PokemonResponse = await client.request(queryPokemonById, {searchQuery: id})
  const pokemonInfo: Pokemon = response.pokemon_v2_pokemon[0]

  // Match the data response with our Pokemon model
  return {
      'id': pokemonInfo.id,
      'name': pokemonInfo.name,
      'height': pokemonInfo.height,
      'base_experience': pokemonInfo.base_experience,
      'weight': pokemonInfo.weight,
      'type': pokemonInfo.pokemon_v2_pokemontypes,  // array
      'sprite': pokemonInfo.pokemon_v2_pokemonsprites[0],
      'stats': pokemonInfo.pokemon_v2_pokemonstats_aggregate,  // array
      'moves': pokemonInfo.pokemon_v2_pokemonmoves  // array
  }
}


export async function createPokemon() {
  const data = { key: 'value' };
  localStorage.setItem('Pikachu', JSON.stringify(data))
}


// const resolvers = {
//   Query: {
//     pokemon: () => { retu}
//   }
// }

// APIs
// export async function getPokemon(pokemon?: string | null) {
//     let data = await client.query({
//       query: queryPokemon,
//       variables: {
//         pokemonName: pokemon,
//       }
//     })

//     return data;
// }
