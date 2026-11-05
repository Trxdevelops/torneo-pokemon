const CLAVE = 'participantes';
export const MAX_PARTICIPANTES = 16;

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function leerParticipantes() {
  const guardado = localStorage.getItem(CLAVE);
  if (!guardado) return [];
  return JSON.parse(guardado);
}

function guardarParticipantes(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export async function getParticipantes() {
  await esperar(400);
  return leerParticipantes();
}

export async function crearParticipante(nuevo) {
  await esperar(600);
  const lista = leerParticipantes();

  if (lista.length >= MAX_PARTICIPANTES) {
    throw new Error('El torneo está completo');
  }

  const nombreRepetido = lista.some(
    (p) => p.entrenador.toLowerCase() === nuevo.entrenador.toLowerCase()
  );
  if (nombreRepetido) {
    throw new Error('Ya hay un entrenador inscrito con ese nombre');
  }

  const participante = { ...nuevo, id: crypto.randomUUID() };
  guardarParticipantes([...lista, participante]);
  return participante;
}