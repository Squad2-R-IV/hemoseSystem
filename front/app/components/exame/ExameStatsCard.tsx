import React from "react";
import { Card, CardHeader, CardBody, Badge } from "@heroui/react";
import { getExamStatusChip } from "~/utils/status";

interface ExameStatsCardProps {
    totalArquivos: number;
    status: string;
    idPaciente: number;
}

export function ExameStatsCard({ totalArquivos, status, idPaciente }: ExameStatsCardProps) {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <h3 className="text-lg font-semibold">Estatísticas</h3>
            </CardHeader>
            <CardBody className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total de Arquivos:</span>
                    <Badge color="primary" variant="flat" size="lg">
                        {totalArquivos}
                    </Badge>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    {getExamStatusChip(status)}
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Paciente ID:</span>
                    <Badge color="secondary" variant="flat">
                        {idPaciente}
                    </Badge>
                </div>
            </CardBody>
        </Card>
    );
}
