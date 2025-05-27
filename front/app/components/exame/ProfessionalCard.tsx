import React from "react";
import { Card, CardHeader, CardBody, Avatar } from "@heroui/react";
import { UserIcon } from "@heroicons/react/24/outline";

interface ProfessionalCardProps {
    profissionalResponsavel: string;
    crmProfissionalResponsavel: string;
}

export function ProfessionalCard({ 
    profissionalResponsavel, 
    crmProfissionalResponsavel 
}: ProfessionalCardProps) {
    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-600 text-white">
                <div className="flex items-center gap-3">
                    <UserIcon className="h-8 w-8" />
                    <div>
                        <h3 className="text-lg font-semibold">Profissional</h3>
                        <p className="text-orange-100">Responsável</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="flex items-center gap-4">
                
                <div>
                    <p className="font-semibold text-lg">{profissionalResponsavel}</p>
                    <p className="text-gray-600">CRM: {crmProfissionalResponsavel}</p>
                </div>
            </CardBody>
        </Card>
    );
}
