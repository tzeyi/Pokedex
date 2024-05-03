import { gql } from 'graphql-request';
import { client } from './lib/graphql-client';
import { Pokemon, PokemonResponse } from "~/model/Pokemon";

// Documentation:
// https://medium.com/@elijahbanjo/understanding-graphql-apis-from-a-rest-api-point-of-view-08196600c667 (REST vs GraphQL)
// https://www.apollographql.com/docs/apollo-server/getting-started (apollo server using query, mutations, resolvers)
// https://www.youtube.com/watch?v=F5rGkgHgAog (remix loader + graphql)

// Note: GraphQL & Rest APis can be used interchangeably
//       Mutation in graphQL can simulate POST/UPDATE requests
//       GraphQL use resolvers for server side functionalities

const queryPokemonAll = gql `
  query PokeAPIquery {
    pokemon_v2_pokemon(limit: 1) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`

const queryPokemonById = gql`
    query PokeAPIquery($searchQuery: Int!) {
        pokemon_v2_pokemon(where: {id: {_eq: $searchQuery}}) {
            id
            name
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                name
                }
            }
            pokemon_v2_pokemonsprites {
                sprites(path: "other.dream_world.front_default")
            }
        }
    }
`

// REST Api
export async function getAllPokemon() {
  const data = await client.request(queryPokemonAll)
  return data
}

export async function getPokemonById(id: number) {
  const response: PokemonResponse = await client.request(queryPokemonById, {searchQuery: id})
  const pokemonInfo: Pokemon = response.pokemon_v2_pokemon[0]

  // Match the data response with our Pokemon model
  return {
      'id': pokemonInfo.id,
      'name': pokemonInfo.name,  
      'type': pokemonInfo.pokemon_v2_pokemontypes[0],
      'sprite': pokemonInfo.pokemon_v2_pokemonsprites[0],
  }
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
