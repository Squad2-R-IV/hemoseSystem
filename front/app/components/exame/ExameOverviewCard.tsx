import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import {
    DocumentIcon,
    CalendarDaysIcon,
    UserIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { formatDateTime, formatExamType } from "~/utils/formatting";
import { getExamStatusChip } from "~/utils/status";
import type { ReadExameDto } from "~/Dtos/Exame/ReadExameDto";

interface ExameOverviewCardProps {
    exame: ReadExameDto;
}

export function ExameOverviewCard({ exame }: ExameOverviewCardProps) {
    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                    <ClipboardDocumentListIcon className="h-8 w-8" />
                    <div>
                        <h2 className="text-xl font-semibold">Informações do Exame</h2>
                        <p className="text-blue-100">Dados principais</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <DocumentIcon className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600">Tipo do Exame</p>
                                <p className="font-semibold">{formatExamType(exame.tipo_do_exame)}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600">Data do Exame</p>
                                <p className="font-semibold">{formatDateTime(exame.dt_exame)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-5 w-5 flex items-center justify-center">
                                {getExamStatusChip(exame.status)}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600">Paciente</p>
                                <p className="font-semibold">{exame.Paciente?.nome_paciente}</p>
                                <p className="text-sm text-gray-500">CRM: {exame.Paciente?.cpf}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
