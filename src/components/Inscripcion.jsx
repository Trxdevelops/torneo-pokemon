import { usePokedex } from '../hooks/usePokedex';
import FormularioInscripcion from './FormularioInscripcion';

export default function Inscripcion() {
  const { data: pokedex, isPending, isError, error, refetch } = usePokedex();

  if (isPending) {
    return (
      <p className="estado" role="status">
        Cargando Pokédex...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="estado estado-error" role="alert">
        <p>No se ha podido cargar la Pokédex: {error.message}</p>
        <button type="button" onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }

  return <FormularioInscripcion pokedex={pokedex} />;
}