import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearParticipante } from '../api/participantes';
import { queryKeys } from './queryKeys';

export function useInscribir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearParticipante,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: queryKeys.participantes });
    },
  });
}