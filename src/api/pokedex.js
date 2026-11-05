const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon-species?limit=100000'; // Trae todos los Pokémon, una vez cada uno (sin variantes)
const SPRITES_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'; // Carpeta donde PokéAPI almacena los sprites

export function getSpriteUrl(id) {
    return `${SPRITES_URL}/${id}.png`; // Construye la URL del sprite a partir del número de Pokédex
}

export async function getPokedex() {
    const respuesta = await fetch(POKEAPI_URL);

    if (!respuesta.ok) {
        throw new Error('No se ha podido cargar la Pokédex');
    }

    const datos = await respuesta.json();

    return datos.results.map((pokemon) => {
        const partes = pokemon.url.split('/');
        const id = partes[partes.length - 2];
        return { id, nombre: pokemon.name };
    });
}