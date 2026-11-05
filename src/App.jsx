import Inscripcion from './components/Inscripcion';
import ListaEquipos from './components/ListaEquipos';
import BotonTema from './components/BotonTema';

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <header className="sidebar-cabecera">
          <div className="sidebar-titulo">
            <h1>Torneo Pokémon</h1>
            <BotonTema />
          </div>
          <p>Inscribe a tu entrenador y su equipo de 6 Pokémon.</p>
        </header>
        <Inscripcion />
      </aside>

      <main className="principal">
        <ListaEquipos />
      </main>
    </div>
  );
}