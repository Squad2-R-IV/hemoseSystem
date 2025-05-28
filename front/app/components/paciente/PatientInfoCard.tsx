import React from "react";
import { Card, CardHeader, CardBody, Input, Divider } from "@heroui/react";
import type { ReadPacienteDto } from "~/Dtos/Paciente/ReadPacienteDto";
import { formatDate, formatSex, formatEstadoCivil } from "~/utils/formatting";

interface PatientInfoCardProps {
    paciente: ReadPacienteDto;
}

export function PatientInfoCard({ paciente }: PatientInfoCardProps) {
    return (
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
    );
}
