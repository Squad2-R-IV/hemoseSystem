import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling, API_TAGS } from "./base-api.service";
import { userEndpoints } from "./user-api.service";
import { agendamentoEndpoints } from "./agendamento-api.service";
import { consultaEndpoints } from "./consulta-api.service";
import { anamneseEndpoints } from "./anamnese-api.service";
import { condutaEndpoints } from "./conduta-api.service";
import { administracaoCondutaEndpoints } from "./administracao-conduta-api.service";
import { evolucaoMedicaEndpoints } from "./evolucao-medica-api.service";
import { altaMedicaEndpoints } from "./alta-medica-api.service";
import { pacienteEndpoints } from "./paciente-api.service";
import { exameEndpoints } from "./exame-api.service";
import { arquivoExameEndpoints } from "./arquivo-exame-api.service";

export const siahmeApi = createApi({
  reducerPath: "siahmeApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: API_TAGS,  endpoints: (builder) => ({
    // User endpoints
    ...userEndpoints(builder),
    
    // Agendamento endpoints
    ...agendamentoEndpoints(builder),
    
    // Consulta endpoints
    ...consultaEndpoints(builder),
    
    // Anamnese endpoints
    ...anamneseEndpoints(builder),
      // Conduta endpoints
    ...condutaEndpoints(builder),
    
    // AdministracaoConduta endpoints
    ...administracaoCondutaEndpoints(builder),
    
      // Evolução Médica endpoints
    ...evolucaoMedicaEndpoints(builder),
    
    // Alta Médica endpoints
    ...altaMedicaEndpoints(builder),
    
    // Paciente endpoints
    ...pacienteEndpoints(builder),
    
    // Exame endpoints
    ...exameEndpoints(builder),
    
    // Arquivo Exame endpoints
    ...arquivoExameEndpoints(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // User hooks
  useLoginMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useChangeUserRolesMutation,
  useGetMedicosQuery,
  useGetGestoresQuery,
  useGetEnfermeirosQuery,
  useGetRecepcionistasQuery,
  useGetDentistasQuery,
  useGetFisioterapeutasQuery,
  
  // Agendamento hooks
  useGetAgendamentosQuery,
  useGetAgendamentoByIdQuery,
  useGetAgendamentosComConsultasAtivasQuery,
  useGetAgendamentosNaEnfermariaQuery,
  useGetAgendamentosByDateQuery,
  useCreateAgendamentoMutation,
  useUpdateAgendamentoMutation,
  useDeleteAgendamentoMutation,
    // Consulta hooks
  useGetConsultasQuery,
  useGetConsultasByPacientIdQuery,
  useGetConsultaByIdQuery,
  useCreateConsultaMutation,
  useUpdateConsultaMutation,
  useDeleteConsultaMutation,
  useFetchAllConsultaDetailsQuery,
  
  // Anamnese hooks
  useGetAnamnesesQuery,
  useGetAnamneseByIdQuery,
  useCreateAnamneseMutation,
  useUpdateAnamneseMutation,
  useDeleteAnamneseMutation,
    // Conduta hooks
  useGetCondutasQuery,
  useGetCondutaByIdQuery,
  useCreateCondutaMutation,
  useUpdateCondutaMutation,
  useDeleteCondutaMutation,
  useGetCondutasByConsultaIdQuery,
  
  // AdministracaoConduta hooks
  useGetAdministracaoCondutasQuery,
  useGetAdministracaoCondutaByIdQuery,
  useCreateAdministracaoCondutaMutation,
  useUpdateAdministracaoCondutaMutation,
  useDeleteAdministracaoCondutaMutation,
  useGetAdministracaoCondutasByCondutaIdQuery,
  
    // Evolução Médica hooks
  useGetEvolucoesMedicasQuery,
  useGetEvolucaoMedicaByIdQuery,
  useCreateEvolucaoMedicaMutation,
  useUpdateEvolucaoMedicaMutation,
  useDeleteEvolucaoMedicaMutation,
  useGetEvolucoesMedicasByConsultaIdQuery,
    // Alta Médica hooks
  useGetAltasMedicasQuery,
  useGetAltaMedicaByIdQuery,
  useCreateAltaMedicaMutation,
  useUpdateAltaMedicaMutation,
  useDeleteAltaMedicaMutation,
  useGetAltaMedicaByConsultaIdQuery,
    // Paciente hooks
  useGetPacientesQuery,
  useGetPacienteByIdQuery,
  useCreatePacienteMutation,
  useUpdatePacienteMutation,
  useDeletePacienteMutation,
  useGetPacienteByCpfQuery,
  useReagendarAgendamentoMutation,
  useRealizarCheckinMutation,
    // Exame hooks
  useGetExamesQuery,
  useGetExameByIdQuery,
  useCreateExameMutation,
  useUpdateExameMutation,
  useDeleteExameMutation,  useGetExamesByPacienteQuery,
  useGetExamesByStatusQuery,
    // Arquivo Exame hooks
  useGetArquivosExameQuery,
  useGetArquivoExameByIdQuery,
  useCreateArquivoExameMutation,
  useUpdateArquivoExameMutation,
  useDeleteArquivoExameMutation,
  useUploadArquivoMutation,
  useUploadMultiplosArquivosMutation,
  useDownloadArquivoQuery,
  useGetArquivosByExameIdQuery,
  useGetArquivosByTipoQuery,
} = siahmeApi;
