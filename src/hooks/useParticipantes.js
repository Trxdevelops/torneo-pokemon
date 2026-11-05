import { useQuery } from '@tanstack/react-query';
import { getParticipantes } from '../api/participantes';
import { queryKeys } from './queryKeys';

export function useParticipantes() {
  return useQuery({
    queryKey: queryKeys.participantes,
    queryFn: getParticipantes,
  });
}