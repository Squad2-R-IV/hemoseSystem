import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Textarea, Tooltip } from "@heroui/react";
import { GenericFilter } from "~/components/GenericFilter";
import { GenericPagination } from "~/components/GenericPagination";
import type { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";
import type { CreateCondutaDto } from "~/Dtos/Conduta/CreateCondutaDto";
import { useCreateAdministracaoCondutaMutation, useGetAdministracaoCondutasByCondutaIdQuery } from "~/services/api";
import { CreateAdministracaoCondutaDto } from "~/Dtos/AdministracaoConduta/CreateAdministracaoCondutaDto";
import getUserIdFromLocalStorage from "~/utils/helper/getUserIdFromLocalStorage";
import { CheckCircleIcon, CheckIcon } from "@phosphor-icons/react";

interface PrescricaoModalProps {
    isOpen: boolean;
    onClose: () => void;
    condutas: ReadCondutaDto[] | undefined;
    onAddConduta: (conduta: CreateCondutaDto) => Promise<void>;
    userId: string;
    consultaId: number;
}

export default function PrescricaoModal({
    isOpen,
    onClose,
    condutas = [],
    onAddConduta,
    userId,
    consultaId,
}: PrescricaoModalProps) {
    // Filter and pagination state
    const [filterColumn, setFilterColumn] = useState("conduta");
    const [filterValue, setFilterValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;    // Modals for adding/viewing condutas
    const [isCondutaFormOpen, setIsCondutaFormOpen] = useState(false);
    const [selectedConduta, setSelectedConduta] = useState<string>("");
    const [condutaFormData, setCondutaFormData] = useState<CreateCondutaDto>({
        id_consulta: consultaId,
        id_funcionario: userId,
        conduta: "",
    });

    // Administration modal state
    const [isAdministrationModalOpen, setIsAdministrationModalOpen] = useState(false);
    const [selectedCondutaForAdmin, setSelectedCondutaForAdmin] = useState<ReadCondutaDto | null>(null);
    const [administrationObservations, setAdministrationObservations] = useState("");
    const [createAdministracaoConduta, { isLoading: isCreatingAdministration }] = useCreateAdministracaoCondutaMutation();

    // Filter columns configuration
    const filterColumns = [
        { key: "conduta", label: "Conduta" },
        { key: "data_criacao", label: "Data" },
    ];    // Group condutas by date
    const groupCondutasByDate = (condutas: ReadCondutaDto[]) => {
        const groups: { [key: string]: ReadCondutaDto[] } = {};

        condutas.forEach(conduta => {
            const date = new Date(conduta.dt_conduta).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(conduta);
        });

        // Sort condutas within each group by time (newest first)
        Object.keys(groups).forEach(date => {
            groups[date].sort((a, b) =>
                new Date(b.dt_conduta).getTime() - new Date(a.dt_conduta).getTime()
            );
        });

        return groups;
    };

    // Filter condutas based on selected column and value
    const filteredCondutas = condutas?.filter((conduta) => {
        if (!filterValue) return true;

        if (filterColumn === "conduta") {
            return conduta.conduta.toLowerCase().includes(filterValue.toLowerCase());
        } else if (filterColumn === "data_criacao") {
            const date = new Date(conduta.dt_conduta).toLocaleDateString();
            return date.includes(filterValue);
        }

        return true;
    });

    // Sort condutas by date (newest first)
    const sortedCondutas = [...(filteredCondutas || [])].sort((a, b) => {
        return new Date(b.dt_conduta).getTime() - new Date(a.dt_conduta).getTime();
    });

    // Group condutas by date
    const groupedCondutas = groupCondutasByDate(sortedCondutas);

    // Get sorted dates (newest first)
    const sortedDates = Object.keys(groupedCondutas).sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
    });


    // Count total items for pagination
    const totalItems = sortedCondutas?.length || 0;

    // Paginate the dates
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedDates = sortedDates.slice(startIndex, startIndex + rowsPerPage);    // Reset form data when opening the form
    const resetFormData = () => {
        setCondutaFormData({
            id_consulta: consultaId,
            id_funcionario: userId,
            conduta: "",
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCondutaFormData((prev) => ({ ...prev, [name]: value }));
    };    const handleCreateConduta = async () => {
        try {
            await onAddConduta(condutaFormData);
            resetFormData();
            setIsCondutaFormOpen(false);
        } catch (error) {
            console.error("Error creating conduta:", error);
        }
    };

    // Administration functions
    const handleOpenAdministrationModal = (conduta: ReadCondutaDto) => {
        setSelectedCondutaForAdmin(conduta);
        setAdministrationObservations("");
        setIsAdministrationModalOpen(true);
    };

    const handleCloseAdministrationModal = () => {
        setIsAdministrationModalOpen(false);
        setSelectedCondutaForAdmin(null);
        setAdministrationObservations("");
    };    const handleConfirmAdministration = async () => {
        if (!selectedCondutaForAdmin) return;

        try {
            const currentUserId = getUserIdFromLocalStorage();
            if (!currentUserId) {
                console.error("User ID not found");
                return;
            }            const administrationData: CreateAdministracaoCondutaDto = {
                id_conduta: selectedCondutaForAdmin.id,
                id_funcionario: currentUserId,
                observacoes: administrationObservations.trim() || undefined,
            };

            await createAdministracaoConduta(administrationData).unwrap();
            handleCloseAdministrationModal();
            // You might want to show a success toast here
        } catch (error) {
            console.error("Error creating administration record:", error);
            // You might want to show an error toast here
        }
    };    // Component to render administration icons with tooltips
    const AdministrationIcons = ({ conduta }: { conduta: ReadCondutaDto }) => {
        const { data: administracoes } = useGetAdministracaoCondutasByCondutaIdQuery(
            { condutaId: conduta.id },
            { skip: !conduta.id }
        );        if (!administracoes || administracoes.length === 0) {
            return null;
        }

        return (
            <div className="flex items-center gap-1 ml-2">
                {administracoes.map((admin, index) => (
                    <Tooltip
                        key={admin.id}
                        content={
                            <div className="p-2 max-w-xs">
                                <div className="font-semibold text-sm mb-1">
                                    Administrado por: {admin.Funcionario?.name || "Funcionário não identificado"}
                                </div>
                                <div className="text-xs text-gray-600 mb-1">
                                    {new Date(admin.dt_administracao).toLocaleString('pt-BR')}
                                </div>
                                {admin.observacoes && (
                                    <div className="text-xs">
                                        <span className="font-medium">Observações:</span>
                                        <div className="mt-1">{admin.observacoes}</div>
                                    </div>
                                )}
                            </div>
                        }
                        placement="top"                        className="bg-white border shadow-lg"
                    >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center cursor-help ${
                            admin.observacoes 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : 'bg-green-100 text-green-700'
                        }`}>
                            <CheckCircleIcon className="w-4 h-4" />
                        </div>
                    </Tooltip>
                ))}
                {administracoes.length > 1 && (
                    <span className="text-xs text-green-600 font-medium ml-1">
                        {administracoes.length}x
                    </span>
                )}
            </div>
        );
    };
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalContent className="max-h-[90vh]">
                    <ModalHeader className="flex flex-col gap-1 bg-blue-50 border-b">
                        <h2 className="text-xl font-bold font-serif text-center">Prescrições Médicas</h2>
                    </ModalHeader>

                    <div className="p-6 bg-gray-50 overflow-y-auto">
                        <div className="flex flex-col md:flex-col gap-4 mb-6 items-start justify-between">
                            <Button
                                color="primary"
                                onPress={() => {
                                    if (!isCondutaFormOpen) resetFormData();
                                    setIsCondutaFormOpen(!isCondutaFormOpen);
                                }}
                                startContent={<span>{isCondutaFormOpen ? "-" : "+"}</span>}
                                className="w-full md:w-auto"
                            >
                                Nova Prescrição
                            </Button>

                            {isCondutaFormOpen && (
                                <div className="w-full bg-blue-50 p-4 rounded-md border border-blue-100 mt-4">
                                    <div className="border-b-2 border-blue-300 pb-3 mb-4">
                                        <h3 className="text-xl font-serif text-center">Nova Prescrição Médica</h3>
                                        <p className="text-sm text-gray-500 text-center mt-1">
                                            HEMOSE - Centro de Hematologia e Hemoterapia
                                        </p>
                                    </div>                                    <div className="mb-4">
                                        <Textarea
                                            name="conduta"
                                            placeholder="Digite aqui a prescrição completa..."
                                            value={condutaFormData.conduta}
                                            onChange={handleInputChange}
                                            minRows={5}
                                            maxRows={8}
                                            className="font-serif"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 mt-2">
                                        <Button color="secondary" variant="light" onPress={() => setIsCondutaFormOpen(false)}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" onPress={handleCreateConduta}>
                                            Salvar Prescrição
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div><div className="bg-white rounded-lg shadow p-6 border border-gray-200 overflow-y-auto" style={{ maxHeight: isCondutaFormOpen ? '35vh' : '60vh' }}>
                            <div className="border-b-2 border-gray-300 mb-4 pb-2">
                                <h3 className="text-xl font-serif text-center mb-2">Prescrição do Paciente</h3>
                                <p className="text-sm text-gray-500 text-center">HEMOSE - Centro de Hematologia e Hemoterapia</p>
                            </div>

                            {paginatedDates.length === 0 ? (
                                <div className="text-center text-gray-500 italic p-4">
                                    Nenhuma prescrição encontrada
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {paginatedDates.map(date => (
                                        <div key={date} className="mb-6">
                                            <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-3">
                                                Prescrição {date}
                                            </h3>
                                            <div className="space-y-4 pl-2">
                                                {groupedCondutas[date].map((conduta, index) => (                                                    <div key={conduta.id} className="relative border-b border-gray-200 pb-3 last:border-0">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">                                                            <div className="font-semibold text-sm text-gray-700 flex items-center">
                                                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center mr-2">
                                                                    {index + 1}
                                                                </span>
                                                                <AdministrationIcons conduta={conduta} />
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {conduta.Consulta?.status === "ENFERMARIA" && (
                                                                    <Button
                                                                        size="sm"
                                                                        color="primary"
                                                                        variant="light"
                                                                        onPress={() => handleOpenAdministrationModal(conduta)}
                                                                    >
                                                                        Administrar
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-3 mt-1 mb-2">
                                                            <div className="whitespace-pre-wrap break-words font-serif pl-4 border-l-2 border-blue-200 pr-2 text-base max-h-60 overflow-y-auto">
                                                                {conduta.conduta}
                                                            </div>
                                                        </div>
                                                        <div className="mt-1 text-xs text-gray-500 italic">
                                                            Prescrição #{conduta.id} - Prescrito por: {conduta.User?.name || "Funcionário não identificado"}, {conduta.User?.conselho}: {conduta.User?.registro} em {new Date(conduta.dt_conduta).toLocaleString('pt-BR')}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <GenericPagination
                            totalItems={totalItems}
                            currentPage={currentPage}
                            rowsPerPage={rowsPerPage}
                            onPageChange={setCurrentPage}
                            className="mt-4"
                        />
                    </div>
                </ModalContent>
            </Modal>
            
            {/* Administration Confirmation Modal */}
            <Modal isOpen={isAdministrationModalOpen} onClose={handleCloseAdministrationModal} size="md">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 bg-green-50 border-b">
                        <h2 className="text-lg font-bold text-center">Confirmar Administração</h2>
                    </ModalHeader>
                    <ModalBody className="py-6">
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2">Prescrição a ser administrada:</h4>
                                <div className="bg-white p-3 rounded border-l-4 border-blue-400 max-h-32 overflow-y-auto">
                                    <p className="text-sm whitespace-pre-wrap">
                                        {selectedCondutaForAdmin?.conduta}
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-sm font-medium mb-2">
                                    Deseja registrar alguma observação sobre a administração?
                                </p>
                                <Textarea
                                    placeholder="Observações (opcional)..."
                                    value={administrationObservations}
                                    onChange={(e) => setAdministrationObservations(e.target.value)}
                                    minRows={3}
                                    maxRows={5}
                                />
                            </div>
                            
                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                <p className="text-sm text-yellow-800">
                                    <strong>Atenção:</strong> Ao confirmar, será registrado que esta prescrição foi administrada no sistema.
                                </p>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="secondary" 
                            variant="light" 
                            onPress={handleCloseAdministrationModal}
                            disabled={isCreatingAdministration}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            color="success" 
                            onPress={handleConfirmAdministration}
                            isLoading={isCreatingAdministration}
                        >
                            Confirmar Administração
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            
            {/* We've moved the form directly into the main modal */}
        </>
    );
}
