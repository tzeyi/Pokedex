// Model for Pokemon, which matches the response format of the API

interface type {
    pokemon_v2_type: {
        name: string
    }
}

interface sprite {
    sprites: string
}

interface PokemonMove {
    pokemon_v2_move: {
        name: string;
    }
    level: number
}

interface PokemonStat {
    nodes: {
        base_stat: number,
        pokemon_v2_stat: {
            name: string
        }
    } []
}

// exported models
export interface PokemonSearch {
    id: number,
    name: string,
}

export interface Pokemon extends PokemonSearch {
    height: number
    base_experience: number
    weight: number
    pokemon_v2_pokemontypes: type[],
    pokemon_v2_pokemonsprites: sprite[],
    pokemon_v2_pokemonmoves: PokemonMove[];
    pokemon_v2_pokemonstats_aggregate: PokemonStat;
}

export interface PokemonResponse {  // the parent (default) response format we get from the API
    pokemon_v2_pokemon: Pokemon[];
}