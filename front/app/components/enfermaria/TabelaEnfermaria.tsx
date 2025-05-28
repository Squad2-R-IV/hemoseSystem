import { Link, useNavigate } from 'react-router';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip, Card, CardHeader, CardBody } from "@heroui/react";
import { EyeIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useUpdateConsultaMutation } from "~/services/siahme-api.service";
import { status_consulta_enum } from "~/utils/enums/enums";
import type { ReadAgendamentoDto } from "~/Dtos/Agendamento/ReadAgendamentoDto";
import type { SortDescriptor } from "@heroui/react";
import type { Key } from "@react-types/shared";
import { GenericFilter } from "~/components/GenericFilter";
import { getStatusChip } from "~/utils/status";
import { formatDateTimeShort } from "~/utils/formatting";
import React from 'react';

interface TabelaEnfermariaProps {
    items: ReadAgendamentoDto[];
    page: number;
    setPage: (page: number) => void;
    sortDescriptor: SortDescriptor;
    setSortDescriptor: (sort: SortDescriptor) => void;
    columns: {
        key: string;
        label: string;
        sortable: boolean;
    }[];
    rowsPerPage: number;
}

export function TabelaEnfermaria({
    items,
    page,
    setPage,
    sortDescriptor,
    setSortDescriptor,
    columns,
    rowsPerPage
}: TabelaEnfermariaProps) {
    const navigate = useNavigate();
    const [filterColumn, setFilterColumn] = React.useState("");
    const [filterValue, setFilterValue] = React.useState("");
    const [updateConsulta] = useUpdateConsultaMutation();

    const filterColumns = [
        { key: "Paciente.nome_paciente", label: "Nome do Paciente" },
        { key: "Usuario.nome_usuario", label: "Funcionário" },
        { key: "tipo_agendamento", label: "Tipo de Agendamento" },
        { key: "status_agendamento", label: "Status" }
    ];    const filteredItems = React.useMemo(() => {
        if (!filterColumn || !filterValue) return items;

        return items.filter((item) => {
            let value = "";

            switch (filterColumn) {
                case "Paciente.nome_paciente":
                    value = item.Paciente?.nome_paciente || "";
                    break;
                case "Usuario.nome_usuario":
                    value = item.Usuario?.name || "";
                    break;
                case "tipo_agendamento":
                    value = item.tipo_agendamento || "";
                    break;
                case "status_agendamento":
                    value = item.Consulta?.status || item.status_agendamento || "";
                    break;
                default:
                    return true;
            }

            return value.toLowerCase().includes(filterValue.toLowerCase());
        });
    }, [items, filterColumn, filterValue]);

    const handleIniciarAcolhimento = async (consulta: any) => {
        try {
            await updateConsulta({
                id: consulta.id,
                body: {
                    status: status_consulta_enum.ENFERMARIA,
                },
            }).unwrap();
            
            // Navigate to consultation page after successful update
            navigate(`/consulta/${consulta.id}`, { viewTransition: true });
        } catch (error) {
            console.error("Error starting acolhimento:", error);
            // You might want to add a toast notification here
        }
    };

    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const paginatedItems = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const getCustomKeyValue = (item: ReadAgendamentoDto, columnKey: Key) => {
        switch (columnKey) {
            case "Paciente.nome_paciente":
                return (
                    <Link
                        to={`/prontuarios/${item.id_paciente}`}
                        className="text-blue-600 hover:underline"
                        viewTransition
                    >
                        {item.Paciente?.nome_paciente || "N/A"}
                    </Link>
                );
            case "Usuario.nome_usuario":
                return item.Usuario?.name || "N/A";
            case "dt_chegada":
                return formatDateTimeShort(item.dt_chegada);
            case "tipo_agendamento":
                return item.tipo_agendamento;
            case "status_agendamento":
                const status = item.Consulta?.status || item.status_agendamento;
                return getStatusChip(status);
            default:
                return "";
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col gap-2">
                <Card>
                    <CardHeader className="text-lg font-semibold">
                        Pacientes na Enfermaria
                    </CardHeader>
                    <CardBody>
                        <p className="text-center text-gray-500 py-8">
                            Nenhum paciente na enfermaria no momento
                        </p>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <Card>
                <CardHeader className="text-lg font-semibold">
                    Pacientes na Enfermaria
                </CardHeader>
                <CardBody>
                    <GenericFilter
                        columns={filterColumns}
                        selectedColumn={filterColumn}
                        filterValue={filterValue}
                        onColumnChange={setFilterColumn}
                        onFilterChange={setFilterValue}
                        placeholder="Digite para filtrar..."
                    />
                </CardBody>
            </Card>

            <Table
                aria-label="Tabela de pacientes na enfermaria"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} allowsSorting={column.sortable}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={paginatedItems} emptyContent={"Nenhum paciente na enfermaria"}>
                    {(item) => (
                        <TableRow key={item.id_paciente}>
                            {(columnKey) => (
                                <TableCell>                                    {columnKey === "actions" && item.Consulta ? (
                                        item.Consulta.status === "AGUARDANDO_ACOLHIMENTO" ? (
                                            <Button
                                                size="sm"
                                                color="warning"
                                                variant="ghost"
                                                startContent={<PlayIcon className="h-6 w-6" />}
                                                onPress={() => handleIniciarAcolhimento(item.Consulta)}
                                            >
                                                Iniciar Acolhimento
                                            </Button>
                                        ) : (
                                            <Button
                                                size="sm"
                                                color="secondary"
                                                variant="ghost"
                                                startContent={<EyeIcon className="h-6 w-6" />}
                                                onPress={() => item.Consulta && navigate(`/consulta/${item.Consulta.id}`, { viewTransition: true })}
                                            >
                                                Visualizar
                                            </Button>
                                        )
                                    ) : (
                                        getCustomKeyValue(item, columnKey) as React.ReactNode
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {filteredItems.length > 0 && (
                <div className="flex justify-center">
                    <Pagination
                        total={pages}
                        page={page}
                        onChange={setPage}
                        color="primary"
                        showControls
                        isDisabled={pages <= 1}
                    />
                </div>
            )}
        </div>
    );
}
