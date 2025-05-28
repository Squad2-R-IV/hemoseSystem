import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    Select,
    SelectItem,
} from "@heroui/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { CreateAltaMedicaDto } from "~/Dtos/AltaMedica/CreateAltaMedicaDto";
import { tipo_alta_enum } from "~/utils/enums/enums";

interface CreateAltaMedicaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateAltaMedica: (data: CreateAltaMedicaDto) => Promise<void>;
    consultaId: number;
    userId: string;
}

const tiposAlta: { value: tipo_alta_enum; label: string }[] = [
    { value: "ALTA", label: "Alta" },
    { value: "OBITO", label: "Óbito" },
    { value: "TRANSFERENCIA", label: "Transferência" },
    { value: "CURA", label: "Cura" },
    { value: "EVASAO", label: "Evasão" },
    { value: "OUTRO", label: "Outro" },
];

export default function CreateAltaMedicaModal({
    isOpen,
    onClose,
    onCreateAltaMedica,
    consultaId,
    userId,
}: CreateAltaMedicaModalProps) {
    const [formData, setFormData] = useState<CreateAltaMedicaDto>({
        id_consulta: consultaId,
        id_medico: userId,
        dt_alta: new Date(),
        tipo_alta: "ALTA",
        relatorio: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.relatorio.trim()) {
            return;
        }

        setIsLoading(true);
        try {
            await onCreateAltaMedica({
                ...formData,
                id_consulta: consultaId,
                id_medico: userId,
                dt_alta: new Date(),
            });
            handleClose();
        } catch (error) {
            console.error("Error creating alta médica:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            id_consulta: consultaId,
            id_medico: userId,
            dt_alta: new Date(),
            tipo_alta: "ALTA",
            relatorio: "",
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
            className="max-w-2xl mx-auto"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 bg-green-50 border-b">
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        <h2 className="text-xl font-bold font-serif">Alta Médica</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        Registrar alta médica do paciente
                    </p>
                </ModalHeader>

                <ModalBody className="p-6">
                    <div className="flex flex-col gap-4">
                        <Select
                            label="Tipo de Alta"
                            placeholder="Selecione o tipo de alta"
                            selectedKeys={[formData.tipo_alta]}
                            onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0] as tipo_alta_enum;
                                setFormData((prev) => ({
                                    ...prev,
                                    tipo_alta: selectedValue,
                                }));
                            }}
                            isRequired            >
                            {Object.entries(tipo_alta_enum).map(([key, label]) => (
                                <SelectItem key={key}>
                                    {label}
                                </SelectItem>
                            ))}
                        </Select>



                        <Textarea
                            label="Relatório de Alta"
                            placeholder="Descreva o estado do paciente e as orientações para alta..."
                            value={formData.relatorio}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    relatorio: e.target.value,
                                }))
                            }
                            minRows={6}
                            maxRows={10}
                            isRequired
                            description="Descreva detalhadamente o estado atual do paciente e as orientações necessárias"
                        />
                    </div>
                </ModalBody>

                <ModalFooter className="flex gap-2">
                    <Button
                        color="danger"
                        variant="light"
                        onPress={handleClose}
                        startContent={<XMarkIcon className="h-4 w-4" />}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="success"
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        isDisabled={!formData.relatorio.trim()}
                        startContent={!isLoading && <CheckCircleIcon className="h-4 w-4" />}
                    >
                        {isLoading ? "Salvando..." : "Registrar Alta"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
