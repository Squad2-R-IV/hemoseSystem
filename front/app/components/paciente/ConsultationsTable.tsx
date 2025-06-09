import React, { useState, useMemo } from "react";
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Button, 
    Divider, 
    Spinner,
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell,
    Tooltip
} from "@heroui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { GenericFilter } from "~/components/GenericFilter";
import { GenericPagination } from "~/components/GenericPagination";
import type { ReadConsultaDto } from "~/Dtos/Consulta/ReadConsultaDto";
import { formatDateTime } from "~/utils/formatting";
import { getStatusChip } from "~/utils/status";
import { useNavigate } from "react-router";
import { useGenericFilter } from "~/hooks/useGenericFilter";

interface ConsultationsTableProps {
    isLoading: boolean;
    consultas: ReadConsultaDto[];
}

export function ConsultationsTable({ isLoading, consultas }: ConsultationsTableProps) {
    const navigate = useNavigate();
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);
    
    // Filter configuration
    const filterableColumns = [
        { key: 'status', label: 'Status' },
        { key: 'dt_entrada', label: 'Data de Entrada' },
        { key: 'observacoes', label: 'Observações' }
    ];

    // Use the generic filter hook
    const {
        filteredData: filteredConsultas,
        selectedColumn,
        filterValue,
        setSelectedColumn,
        setFilterValue
    } = useGenericFilter<ReadConsultaDto>({
        data: consultas || [],
        searchableFields: ['status', 'dt_entrada', 'observacoes']
    });

    // Handle pagination
    const paginatedConsultas = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredConsultas.slice(start, end);
    }, [filteredConsultas, page]);

    // Navigation handler
    const handleViewConsulta = (consultaId: number) => {
        navigate(`/consulta/${consultaId}`, { viewTransition: true });
    };

    return (
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
                {isLoading ? (
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
                                            <Tooltip content="Ver detalhes">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="primary"
                                                    onClick={() => handleViewConsulta(consulta.id)}
                                                >
                                                    <EyeIcon className="h-[18px] w-[18px]" />
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                        {/* Pagination */}
                        <GenericPagination
                            totalItems={filteredConsultas.length}
                            currentPage={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </CardBody>
        </Card>
    );
}
