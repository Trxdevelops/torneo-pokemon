import PokemonSprite from './PokemonSprite';

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function TarjetaEquipo({ participante }) {
  const { entrenador, region, equipo } = participante;

  return (
    <article className="tarjeta">
      <header className="tarjeta-cabecera">
        <h3>{entrenador}</h3>
        <span className="tarjeta-region">{region}</span>
      </header>

      <ul className="tarjeta-equipo">
        {equipo.map((pokemon) => (
          <li key={pokemon.id} title={capitalizar(pokemon.nombre)}>
            <PokemonSprite id={pokemon.id} nombre={pokemon.nombre} tamano={56} />
          </li>
        ))}
      </ul>
    </article>
  );
}