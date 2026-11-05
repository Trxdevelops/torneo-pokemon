import { useEffect, useState } from 'react';

const CLAVE_TEMA = 'tema';

function leerTemaGuardado() {
  return localStorage.getItem(CLAVE_TEMA) ?? 'oscuro';
}

export default function BotonTema() {
  const [tema, setTema] = useState(leerTemaGuardado);
  const oscuro = tema === 'oscuro';

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem(CLAVE_TEMA, tema);
  }, [tema]);

  function cambiarTema() {
    setTema(oscuro ? 'claro' : 'oscuro');
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={oscuro}
      onClick={cambiarTema}
      className="boton-tema"
    >
      <span className="interruptor" aria-hidden="true" />
      Modo oscuro
    </button>
  );
}
