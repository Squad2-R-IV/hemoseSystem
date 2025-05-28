import React from "react";
import { useParams, useNavigate } from "react-router";
import { Spinner } from "@heroui/react";
import { useGetPacienteByIdQuery, useGetConsultasByPacientIdQuery, useGetExamesByPacienteQuery } from "~/services/api";
import { 
    PatientInfoCard,
    PageHeader, 
    ErrorState, 
    ConsultationsTable,
    ExamsTable
} from "~/components/paciente";

export default function PacienteDetail() {
    const { pacienteId } = useParams<{ pacienteId: string }>();
    const navigate = useNavigate();
    
    // Fetch patient data
    const {
        data: paciente,
        isLoading: isLoadingPaciente,
        error: pacienteError
    } = useGetPacienteByIdQuery({
        id: Number(pacienteId),
        includeRelations: true
    }, {
        skip: !pacienteId
    });
    
    // Fetch patient consultations
    const {
        data: consultas = [],
        isLoading: isLoadingConsultas,
        error: consultasError
    } = useGetConsultasByPacientIdQuery({
        pacienteId: Number(pacienteId)
    }, {
        skip: !pacienteId
    });

    // Fetch patient exams
    const {
        data: exames = [],
        isLoading: isLoadingExames,
        error: examesError
    } = useGetExamesByPacienteQuery(Number(pacienteId), {
        skip: !pacienteId
    });

    if (isLoadingPaciente) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (pacienteError || !paciente) {
        return (
            <ErrorState 
                message="Erro ao carregar dados do paciente"
                buttonText="Voltar aos Prontuários"
                onButtonClick={() => navigate('/prontuarios', { viewTransition: true })}
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header with back button */}
            <PageHeader 
                title="Detalhes do Paciente"
                onBackClick={() => navigate(-1)}
            />

            {/* Patient Information Card */}
            <PatientInfoCard paciente={paciente} />

            {/* Consultations Table */}
            <ConsultationsTable
                isLoading={isLoadingConsultas}
                consultas={consultas}
            />

            {/* Exams Table */}
            <ExamsTable
                isLoading={isLoadingExames}
                exames={exames}
            />
        </div>
    );
}
