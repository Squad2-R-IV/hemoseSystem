import { useFetchAllConsultaDetailsQuery } from "~/services/siahme-api.service";

export function useConsultaData(consultaId: number) {
  const { data, isLoading, refetch } = useFetchAllConsultaDetailsQuery({
    id: consultaId,
    includeRelations: true,
  });

  const { consulta, condutas, evolucoesMedicas, agendamento } = data || {};

  return {
    consulta,
    condutas,
    evolucoesMedicas,
    agendamento,
    isLoading,
    refetch,
  };
}
