import { gql } from 'graphql-request';

export const queryPokemonById = gql`
query PokeAPIquery($searchQuery: Int!) {
  pokemon_v2_pokemon(where: {id: {_eq: $searchQuery}}, limit: 7) {
    id
    name
    height
    base_experience
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonsprites {
      sprites(path: "other.home.front_default")
    }
    pokemon_v2_pokemonmoves(limit: 6) {
      pokemon_v2_move {
        name
      }
      level
    }
    pokemon_v2_pokemonstats_aggregate {
      nodes {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
}
`

export const queryPokemonByName = gql`
  query PokeAPIquery($searchQuery: String!) {
    pokemon_v2_pokemon(where: {name: {_like: $searchQuery}}, limit: 7) {
        id
        name
    }
  }
`