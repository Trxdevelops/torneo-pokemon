const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000'; //Permite Usar Cualquier Pokemon.
const SPRITES_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'; //Carpeta donde PokeaAPI almacena los sprites.

export function getSpriteUrl(id) {
    return `${SPRITES_URL}/${id}.png`; //Devuelve Sprite de pokemon por numero de pokedex
}

export async function getPokedex() {
    const respuesta = await fetch{POKEAPI_URL};

    if (!respuesta.ok) {
        throw new Error('No se ha podido cargar la pokedex');
    }

    const datos = await respuesta.json();

    return datos.results.map((pokemon) => {
        const partes = pokemon.url.split('/');
        const id = partes[partes.length -2];
        return {id, nombre: pokemon.name};
    });
}