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
import { useGetPacienteByIdQuery, useGetConsultasByPacientIdQuery, useGetExamesByPacienteQuery } from "~/services/api";
import { useGenericFilter } from "~/hooks/useGenericFilter";
import { GenericFilter } from "~/components/GenericFilter";
import { GenericPagination } from "~/components/GenericPagination";
import type { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";
import type { ReadExameDto } from "~/Dtos/Exame/ReadExameDto";
import { formatDate, formatDateTime, formatSex, formatEstadoCivil, formatExamType, formatExamStatus } from "~/utils/formatting";
import { getStatusColor, getStatusChip, getExamStatusChip } from "~/utils/status";

export default function PacienteDetail() {
    const { pacienteId } = useParams<{ pacienteId: string }>();
    const navigate = useNavigate();    // Pagination state
    const [page, setPage] = useState(1);
    const [examPage, setExamPage] = useState(1);
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
    });    // Fetch patient consultations
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
    });    // Generic filter for consultations
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

    // Generic filter for exams
    const {
        filteredData: filteredExames,
        selectedColumn: examSelectedColumn,
        filterValue: examFilterValue,
        setSelectedColumn: setExamSelectedColumn,
        setFilterValue: setExamFilterValue,
        resetFilter: resetExamFilter
    } = useGenericFilter<ReadExameDto>({
        data: exames,
        searchableFields: ['status', 'tipo_do_exame', 'dt_exame', 'profissional_responsavel']
    });    // Pagination logic
    const pages = Math.ceil(filteredConsultas.length / rowsPerPage);
    const paginatedConsultas = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredConsultas.slice(start, end);
    }, [filteredConsultas, page]);

    // Exam pagination logic
    const examPages = Math.ceil(filteredExames.length / rowsPerPage);
    const paginatedExames = useMemo(() => {
        const start = (examPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredExames.slice(start, end);
    }, [filteredExames, examPage]);    const handleViewConsulta = (consultaId: number) => {
        navigate(`/consulta/${consultaId}`, { viewTransition: true });
    };

    const handleViewExame = (exameId: number) => {
        navigate(`/exame/${exameId}`, { viewTransition: true });
    };

    // Get filterable columns for GenericFilter
    const filterableColumns = [
        { key: 'status', label: 'Status' },
        { key: 'dt_entrada', label: 'Data de Entrada' },
        { key: 'observacoes', label: 'Observações' }
    ];

    // Get filterable columns for exams
    const examFilterableColumns = [
        { key: 'status', label: 'Status' },
        { key: 'tipo_do_exame', label: 'Tipo do Exame' },
        { key: 'dt_exame', label: 'Data do Exame' },
        { key: 'profissional_responsavel', label: 'Profissional Responsável' }
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
                <Button color="primary" onClick={() => navigate('/prontuarios', { viewTransition: true })}>
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
                <CardHeader className="grid grid-cols-1 sm:grid-cols-1 items-center justify-between p-4">
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
                                                {getStatusChip(consulta.status)}
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
                            </Table>                            {/* Pagination */}
                            <GenericPagination
                                totalItems={filteredConsultas.length}
                                currentPage={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </CardBody>
            </Card>            {/* Exams Table */}
            <Card>
                <CardHeader className="grid grid-cols-1 sm:grid-cols-1 items-center justify-between p-4">
                    <h2 className="text-lg font-semibold">Exames</h2>
                    <GenericFilter
                        columns={examFilterableColumns}
                        selectedColumn={examSelectedColumn}
                        filterValue={examFilterValue}
                        onColumnChange={setExamSelectedColumn}
                        onFilterChange={setExamFilterValue}
                        placeholder="Digite para filtrar exames..."
                    />
                </CardHeader>
                <Divider />
                <CardBody className="p-0">
                    {isLoadingExames ? (
                        <div className="flex justify-center items-center h-32">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <Table aria-label="Tabela de exames do paciente">
                                <TableHeader>
                                    <TableColumn>Data do Exame</TableColumn>
                                    <TableColumn>Tipo do Exame</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                    <TableColumn>Profissional</TableColumn>
                                    <TableColumn>Resultado</TableColumn>
                                    <TableColumn>Ações</TableColumn>
                                </TableHeader>
                                <TableBody emptyContent="Nenhum exame encontrado">
                                    {paginatedExames.map((exame) => (
                                        <TableRow key={exame.id}>
                                            <TableCell>
                                                {formatDateTime(exame.dt_exame)}
                                            </TableCell>
                                            <TableCell>
                                                {formatExamType(exame.tipo_do_exame)}
                                            </TableCell>
                                            <TableCell>
                                                {getExamStatusChip(exame.status)}
                                            </TableCell>
                                            <TableCell>
                                                {exame.profissional_responsavel || "Não informado"}
                                            </TableCell>
                                            <TableCell>
                                                {exame.resultado || "Sem resultado"}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="primary"
                                                    onClick={() => handleViewExame(exame.id)}
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
                            <GenericPagination
                                totalItems={filteredExames.length}
                                currentPage={examPage}
                                rowsPerPage={rowsPerPage}
                                onPageChange={setExamPage}
                            />
                        </>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}