# Torneo Pokémon

Formulario de inscripción para un torneo Pokémon: cada entrenador se
apunta con sus datos y un equipo de 6 Pokémon, y los equipos inscritos
aparecen en la lista de participantes.

## Cómo probarlo
Instala las dependencias con `npm install` y arranca el proyecto con
`npm run dev`. Abre en el navegador la dirección que muestra Vite
(normalmente http://localhost:5173). Hace falta conexión a internet,
porque la Pokédex y los sprites se cargan desde PokéAPI.
Rellena el formulario y pulsa «Inscribir equipo»: el equipo aparece en
la lista de inscritos. Las inscripciones se guardan en localStorage, así
que siguen ahí al recargar la página. Casos límite para probar: un
Pokémon repetido, uno que no existe, un nombre de entrenador ya inscrito
o un entrenador número 17 (el máximo es 16). El botón «Modo oscuro»
cambia el tema y lo recuerda.

## Uso de IA
Usé Claude Cowork como apoyo mano a mano durante el proyecto, no para
que lo hiciera por mí.
Por un lado, le pedía explicaciones y propuestas concretas (cómo usar
una librería, cómo plantear una parte del código o por qué fallaba
algo), y no daba nada por bueno sin contrastarlo antes con la
documentación oficial u otras fuentes.
Por otro, las partes que escribí a mano se las pasaba para preguntarle
si eran óptimas o se podían mejorar, pidiéndole siempre fuentes que
respaldaran sus sugerencias. Solo cambiaba algo cuando lo había
entendido y comprobado por mi cuenta.
Ejemplo de prompt real: "Comprueba en el proyecto si existe alguna forma
de optimizar alguna sección del código, cómo y por qué".

## Autopsia
1. La lista de inscritos no vive en un useState: es una query de
   TanStack Query, y al inscribir a alguien la mutación invalida esa
   query para que se vuelva a pedir. Así la fuente de verdad son los
   datos guardados y la pantalla solo los refleja. Descarté guardar los
   participantes en el estado de App y añadir el nuevo a mano: tendría
   los datos en dos sitios que mantener sincronizados y habría que pasar
   el estado por props al formulario y a la lista.
2. El esquema de Zod se crea con una función que recibe los nombres de
   la Pokédex, así que la validación «Ese Pokémon no existe» va dentro
   del propio esquema, comprobando contra un Set. La Pokédex se pide una
   sola vez (staleTime: Infinity) y el formulario no se muestra hasta
   que ha cargado. Descarté validar cada Pokémon con una petición a
   PokéAPI al escribirlo: serían muchas peticiones y la validación
   pasaría a depender de la red en cada campo.
