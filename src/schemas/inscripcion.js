import { z } from 'zod';

export const REGIONES = [
  'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Teselia',
  'Kalos', 'Alola', 'Galar', 'Paldea',
];

export const TAMANO_EQUIPO = 6;

export function crearInscripcionSchema(nombresValidos) {
  const pokemonExistentes = new Set(nombresValidos);

  return z.object({
    entrenador: z
      .string()
      .trim()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(16, 'El nombre no puede pasar de 16 caracteres')
      .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guion bajo (sin espacios)'),

    email: z.email('Introduce un email válido'),

    edad: z.coerce
      .number()
      .int('La edad debe ser un número entero')
      .min(10, 'Necesitas al menos 10 años para ser entrenador Pokémon')
      .max(123, 'Ni Jeanne Calment llego a tanto'),

    region: z.enum(REGIONES, { error: 'Elige tu región de origen' }),

    equipo: z
      .array(
        z
          .string()
          .trim()
          .toLowerCase()
          .min(1, 'Elige un Pokémon')
          .refine((nombre) => pokemonExistentes.has(nombre), 'Ese Pokémon no existe')
      )
      .length(TAMANO_EQUIPO, `El equipo debe tener ${TAMANO_EQUIPO} Pokémon`)
      .refine(
        (equipo) => new Set(equipo).size === equipo.length,
        'No puedes repetir Pokémon en el equipo'
      ),

    aceptaNormas: z.literal(true, { error: 'Debes aceptar las normas del torneo' }),
  });
}