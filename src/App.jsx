import { usePokedex } from './hooks/usePokedex';

export default function App() {
  const { data, isPending, isError, error } = usePokedex();

  if (isPending) return <p>Cargando Pokédex...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <p>{data.length} Pokémon cargados. El 25 es {data[24].nombre}.</p>;
}