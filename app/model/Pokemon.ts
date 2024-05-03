// Model for Pokemon, which matches the response format of the API

interface type {
    pokemon_v2_type: {
        name: string
    }
}

interface sprite {
    sprites: string
}

export interface Pokemon {
    id: number,
    name: string,
    pokemon_v2_pokemontypes: type[],
    pokemon_v2_pokemonsprites: sprite[]
}

export interface PokemonResponse {
    pokemon_v2_pokemon: Pokemon[];
}