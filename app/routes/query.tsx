import { gql } from 'graphql-request';

export const queryPokemonAll = gql `
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

export const queryPokemonById = gql`
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
                sprites(path: "other.home.front_default")
            }
        }
    }
`

export const queryPokemonByName = gql`
  query PokeAPIquery($searchQuery: String!) {
    pokemon_v2_pokemon(where: {name: {_like: $searchQuery}}, limit: 7) {
        id
        name
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
            name
            }
        }
        pokemon_v2_pokemonsprites {
            sprites(path: "other.home.front_default")
        }
    }
  }
`