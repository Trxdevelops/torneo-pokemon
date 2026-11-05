import { useState } from 'react';
import { getSpriteUrl } from '../api/pokedex';

export default function PokemonSprite({ id, nombre, tamano = 64 }) {
  const [idFallido, setIdFallido] = useState(null);

  if (!id || id === idFallido) {
    return (
      <span
        className="sprite-vacio"
        style={{ width: tamano, height: tamano }}
        aria-hidden="true"
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={getSpriteUrl(id)}
      alt={nombre}
      width={tamano}
      height={tamano}
      loading="lazy"
      onError={() => setIdFallido(id)}
    />
  );
}