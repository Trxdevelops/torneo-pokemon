import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { crearInscripcionSchema, REGIONES, TAMANO_EQUIPO } from '../schemas/inscripcion';
import { useInscribir } from '../hooks/useInscribir';
import CampoPokemon from './CampoPokemon';

const VALORES_INICIALES = {
  entrenador: '',
  email: '',
  edad: '',
  region: '',
  equipo: Array(TAMANO_EQUIPO).fill(''),
  aceptaNormas: false,
};

export default function FormularioInscripcion({ pokedex }) {
  const idPorNombre = useMemo(
    () => new Map(pokedex.map((p) => [p.nombre, p.id])),
    [pokedex]
  );

  const schema = useMemo(
    () => crearInscripcionSchema(pokedex.map((p) => p.nombre)),
    [pokedex]
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: VALORES_INICIALES,
  });

  const inscribir = useInscribir();

  function onSubmit(datos) {
    const participante = {
      ...datos,
      equipo: datos.equipo.map((nombre) => ({ id: idPorNombre.get(nombre), nombre })),
    };

    inscribir.mutate(participante, {
      onSuccess: () => reset(),
    });
  }

  function propsAccesibles(campo) {
    return {
      'aria-invalid': errors[campo] ? 'true' : 'false',
      'aria-describedby': errors[campo] ? `${campo}-error` : undefined,
    };
  }

  function mostrarError(campo) {
    if (!errors[campo]) return null;
    return (
      <p id={`${campo}-error`} className="error" role="alert">
        {errors[campo].message}
      </p>
    );
  }

  const errorEquipo = errors.equipo?.root?.message ?? errors.equipo?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="formulario">
      <h2>Inscripción</h2>

      <div className="campo">
        <label htmlFor="entrenador">Nombre de entrenador</label>
        <input
          id="entrenador"
          type="text"
          autoComplete="nickname"
          {...propsAccesibles('entrenador')}
          {...register('entrenador')}
        />
        {mostrarError('entrenador')}
      </div>

      <div className="campo">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...propsAccesibles('email')}
          {...register('email')}
        />
        {mostrarError('email')}
      </div>

      <div className="campo">
        <label htmlFor="edad">Edad</label>
        <input
          id="edad"
          type="number"
          inputMode="numeric"
          {...propsAccesibles('edad')}
          {...register('edad')}
        />
        {mostrarError('edad')}
      </div>

      <div className="campo">
        <label htmlFor="region">Región de origen</label>
        <select id="region" {...propsAccesibles('region')} {...register('region')}>
          <option value="">Elige una región</option>
          {REGIONES.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {mostrarError('region')}
      </div>

      <fieldset className="equipo">
        <legend>Tu equipo ({TAMANO_EQUIPO} Pokémon)</legend>

        <datalist id="lista-pokedex">
          {pokedex.map((p) => (
            <option key={p.id} value={p.nombre} />
          ))}
        </datalist>

        <div className="equipo-campos">
          {Array.from({ length: TAMANO_EQUIPO }, (_, i) => (
            <CampoPokemon
              key={i}
              index={i}
              register={register}
              control={control}
              error={errors.equipo?.[i]}
              idPorNombre={idPorNombre}
            />
          ))}
        </div>

        {errorEquipo && (
          <p className="error" role="alert">
            {errorEquipo}
          </p>
        )}
      </fieldset>

      <div className="campo campo-checkbox">
        <input
          id="aceptaNormas"
          type="checkbox"
          {...propsAccesibles('aceptaNormas')}
          {...register('aceptaNormas')}
        />
        <label htmlFor="aceptaNormas">Acepto las normas del torneo</label>
        {mostrarError('aceptaNormas')}
      </div>

      {inscribir.isError && (
        <p className="aviso aviso-error" role="alert">
          {inscribir.error.message}
        </p>
      )}

      {inscribir.isSuccess && (
        <p className="aviso aviso-exito" role="status">
          ¡{inscribir.data.entrenador} se ha inscrito en el torneo!
        </p>
      )}

      <button type="submit" disabled={inscribir.isPending}>
        {inscribir.isPending ? 'Inscribiendo...' : 'Inscribir equipo'}
      </button>
    </form>
  );
}