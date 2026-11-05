import { useQuery } from '@tanstack/react-query';
import { getPokedex } from '../api/pokedex';
import { queryKeys } from './queryKeys';

export function usePokedex() {
  return useQuery({
    queryKey: queryKeys.pokedex,
    queryFn: getPokedex,
    staleTime: Infinity,
  });
}