import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Divider,
    Spinner,
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from "@heroui/react";
import { ArrowLeftIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useGetPacienteByIdQuery, useGetConsultasByPacientIdQuery } from "~/services/api";
import { useGenericFilter } from "~/hooks/useGenericFilter";
import { GenericFilter } from "~/components/GenericFilter";
import type { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";

export default function PacienteDetail() {
    const { pacienteId } = useParams<{ pacienteId: string }>();
    const navigate = useNavigate();

    // Pagination state
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
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
    // Generic filter for consultations
    const {
        filteredData: filteredConsultas,
        selectedColumn,
        filterValue,
        setSelectedColumn,
        setFilterValue,
        resetFilter
    } = useGenericFilter<ReadConsultaDto>({
        data: consultas,
        searchableFields: ['status', 'dt_entrada', 'observacoes']
    });

    // Pagination logic
    const pages = Math.ceil(filteredConsultas.length / rowsPerPage);
    const paginatedConsultas = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredConsultas.slice(start, end);
    }, [filteredConsultas, page]);

    // Format functions
    const formatDate = (date: Date | string) => {
        if (!date) return "-";
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('pt-BR');
    };

    const formatDateTime = (date: Date | string) => {
        if (!date) return "-";
        const dateObj = new Date(date);
        return dateObj.toLocaleString('pt-BR');
    };

    const formatSex = (sex: string) => {
        switch (sex) {
            case 'M': return 'Masculino';
            case 'F': return 'Feminino';
            case 'O': return 'Outro';
            default: return 'Não informado';
        }
    };

    const formatEstadoCivil = (estadoCivil: string) => {
        switch (estadoCivil) {
            case 'S': return 'Solteiro(a)';
            case 'C': return 'Casado(a)';
            case 'D': return 'Divorciado(a)';
            case 'V': return 'Viúvo(a)';
            default: return 'Não informado';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'AGUARDANDO': return 'warning';
            case 'EM_ATENDIMENTO': return 'primary';
            case 'CHAMADO': return 'secondary';
            case 'FINALIZADO': return 'success';
            case 'CANCELADO': return 'danger';
            default: return 'default';
        }
    };

    const handleViewConsulta = (consultaId: number) => {
        navigate(`/consulta/${consultaId}`);
    };

    // Get filterable columns for GenericFilter
    const filterableColumns = [
        { key: 'status', label: 'Status' },
        { key: 'dt_entrada', label: 'Data de Entrada' },
        { key: 'observacoes', label: 'Observações' }
    ];

    if (isLoadingPaciente) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (pacienteError || !paciente) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-red-500 mb-4">Erro ao carregar dados do paciente</p>
                <Button color="primary" onClick={() => navigate('/prontuarios')}>
                    Voltar aos Prontuários
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
                <Button
                    isIconOnly
                    variant="light"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">Detalhes do Paciente</h1>
            </div>

            {/* Patient Information Card */}
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Informações do Paciente</h2>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="grid grid-cols-2 gap-4">
                        {/* First row */}
                        <Input
                            label="Nome Completo"
                            value={paciente.nome_paciente || ""}
                            isReadOnly
                            
                        />
                        <Input
                            label="CPF"
                            value={paciente.cpf || ""}
                            isReadOnly
                            
                        />
                        {/* Second row */}
                        <Input
                            label="Data de Nascimento"
                            value={formatDate(paciente.dt_nascimento)}
                            isReadOnly
                            
                        />
                        <Input
                            label="Sexo"
                            value={formatSex(paciente.sexo)}
                            isReadOnly
                            
                        />
                    </div>

                    {/* Additional information in a second row if needed */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Input
                            label="Estado Civil"
                            value={formatEstadoCivil(paciente.estado_civil)}
                            isReadOnly
                            
                        />
                        <Input
                            label="Endereço"
                            value={paciente.endereco || "Não informado"}
                            isReadOnly
                            
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Consultations Table */}
            <Card>
                <CardHeader className="flex justify-between flex-col items-start">
                    <h2 className="text-lg font-semibold">Histórico de Consultas</h2>
                    <GenericFilter
                        columns={filterableColumns}
                        selectedColumn={selectedColumn}
                        filterValue={filterValue}
                        onColumnChange={setSelectedColumn}
                        onFilterChange={setFilterValue}
                        placeholder="Digite para filtrar consultas..."
                    />
                </CardHeader>
                <Divider />
                <CardBody className="p-0">
                    {isLoadingConsultas ? (
                        <div className="flex justify-center items-center h-32">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <Table aria-label="Tabela de consultas do paciente">
                                <TableHeader>
                                    <TableColumn>Data da Consulta</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                    <TableColumn>Procedimento</TableColumn>
                                    <TableColumn>Observações</TableColumn>
                                    <TableColumn>Ações</TableColumn>
                                </TableHeader>
                                <TableBody emptyContent="Nenhuma consulta encontrada">
                                    {paginatedConsultas.map((consulta) => (
                                        <TableRow key={consulta.id}>
                                            <TableCell>
                                                {formatDateTime(consulta.dt_entrada)}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    color={getStatusColor(consulta.status)}
                                                    variant="flat"
                                                >
                                                    {consulta.status}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                {consulta.procedimento || "Não informado"}
                                            </TableCell>
                                            <TableCell>
                                                {consulta.observacoes || "Sem observações"}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="primary"
                                                    onClick={() => handleViewConsulta(consulta.id)}
                                                    aria-label="Ver detalhes"
                                                >
                                                    <EyeIcon className="h-[18px] w-[18px]" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {filteredConsultas.length > 0 && (
                                <div className="flex justify-center p-4">
                                    <Pagination
                                        total={pages}
                                        page={page}
                                        onChange={setPage}
                                        color="primary"
                                        showControls
                                        showShadow
                                    />
                                </div>
                            )}
                        </>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}