import { useWatch } from 'react-hook-form';
import PokemonSprite from './PokemonSprite';

export default function CampoPokemon({ index, register, control, error, idPorNombre }) {
  const nombreCampo = `equipo.${index}`;
  const inputId = `pokemon-${index}`;
  const errorId = `pokemon-${index}-error`;

  const texto = useWatch({ control, name: nombreCampo }) ?? '';
  const nombre = texto.trim().toLowerCase();
  const id = idPorNombre.get(nombre);

  return (
    <div className="campo-pokemon">
      <PokemonSprite id={id} nombre={nombre} tamano={48} />

      <div className="campo-pokemon-input">
        <label htmlFor={inputId}>Pokémon {index + 1}</label>
        <input
          id={inputId}
          type="text"
          list="lista-pokedex"
          autoComplete="off"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          {...register(nombreCampo)}
        />
        {error && (
          <p id={errorId} className="error" role="alert">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}