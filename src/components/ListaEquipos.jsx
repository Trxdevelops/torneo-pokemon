import { useParticipantes } from '../hooks/useParticipantes';
import { MAX_PARTICIPANTES } from '../api/participantes';
import TarjetaEquipo from './TarjetaEquipo';

export default function ListaEquipos() {
  const {
    data: participantes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useParticipantes();

  return (
    <section className="lista-equipos" aria-labelledby="titulo-equipos">
      <header className="lista-cabecera">
        <h2 id="titulo-equipos">Equipos inscritos</h2>

        {participantes && (
          <span className="contador">
            {participantes.length}/{MAX_PARTICIPANTES} entrenadores
          </span>
        )}

        {isFetching && !isPending && (
          <span className="actualizando">Actualizando...</span>
        )}
      </header>

      {isPending && (
        <p className="estado" role="status">
          Cargando equipos...
        </p>
      )}

      {isError && (
        <div className="estado estado-error" role="alert">
          <p>No se han podido cargar los equipos: {error.message}</p>
          <button type="button" onClick={() => refetch()}>
            Reintentar
          </button>
        </div>
      )}

      {participantes && participantes.length === 0 && (
        <p className="estado">Aún no hay entrenadores inscritos. ¡Sé el primero!</p>
      )}

      {participantes && participantes.length > 0 && (
        <div className="equipos">
          {participantes.map((participante) => (
            <TarjetaEquipo key={participante.id} participante={participante} />
          ))}
        </div>
      )}
    </section>
  );
}