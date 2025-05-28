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
    TableCell 
} from "@heroui/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { GenericFilter } from "~/components/GenericFilter";
import { GenericPagination } from "~/components/GenericPagination";
import type { ReadExameDto } from "~/Dtos/Exame/ReadExameDto";
import { formatDateTime, formatExamType } from "~/utils/formatting";
import { getExamStatusChip } from "~/utils/status";
import { useNavigate } from "react-router";
import { useGenericFilter } from "~/hooks/useGenericFilter";

interface ExamsTableProps {
    isLoading: boolean;
    exames: ReadExameDto[];
}

export function ExamsTable({ isLoading, exames }: ExamsTableProps) {
    const navigate = useNavigate();
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);
    
    // Filter configuration
    const filterableColumns = [
        { key: 'status', label: 'Status' },
        { key: 'tipo_do_exame', label: 'Tipo do Exame' },
        { key: 'dt_exame', label: 'Data do Exame' },
        { key: 'profissional_responsavel', label: 'Profissional Responsável' }
    ];

    // Use the generic filter hook
    const {
        filteredData: filteredExames,
        selectedColumn,
        filterValue,
        setSelectedColumn,
        setFilterValue
    } = useGenericFilter<ReadExameDto>({
        data: exames || [],
        searchableFields: ['status', 'tipo_do_exame', 'dt_exame', 'profissional_responsavel']
    });

    // Handle pagination
    const paginatedExames = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredExames.slice(start, end);
    }, [filteredExames, page]);

    // Navigation handler
    const handleViewExame = (exameId: number) => {
        navigate(`/exame/${exameId}`, { viewTransition: true });
    };

    return (
        <Card>
            <CardHeader className="grid grid-cols-1 sm:grid-cols-1 items-center justify-between p-4">
                <h2 className="text-lg font-semibold">Exames</h2>
                <GenericFilter
                    columns={filterableColumns}
                    selectedColumn={selectedColumn}
                    filterValue={filterValue}
                    onColumnChange={setSelectedColumn}
                    onFilterChange={setFilterValue}
                    placeholder="Digite para filtrar exames..."
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
