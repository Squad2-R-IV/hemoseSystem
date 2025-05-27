import React from "react";
import { Card, CardHeader, CardBody, ScrollShadow } from "@heroui/react";
import { DocumentTextIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

interface ExameResultCardProps {
    resultado?: string | null;
}

export function ExameResultCard({ resultado }: ExameResultCardProps) {
    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                <div className="flex items-center gap-3">
                    <DocumentTextIcon className="h-8 w-8" />
                    <div>
                        <h2 className="text-xl font-semibold">Resultado</h2>
                        <p className="text-green-100">Laudo do exame</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                {resultado ? (
                    <ScrollShadow className="h-32">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {resultado}
                        </p>
                    </ScrollShadow>
                ) : (
                    <div className="flex items-center justify-center h-20 text-gray-500">
                        <InformationCircleIcon className="h-6 w-6 mr-2" />
                        Resultado ainda não disponível
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
