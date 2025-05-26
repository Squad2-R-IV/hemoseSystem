import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Divider,
  Button,
  addToast,
} from "@heroui/react";
import { FunnelIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import type { ReadPacienteDto } from "~/Dtos/Paciente/ReadPacienteDto";
import { useGetPacientesQuery, useDeletePacienteMutation, useUpdatePacienteMutation } from "~/services/siahme-api.service";
import { DeletePacienteModal } from "./DeletePacienteModal";
import { UpdatePacienteModal } from "./UpdatePacienteModal";
import { UpdatePacienteDto } from "~/Dtos/Paciente/UpdatePacienteDto";

interface PacientesTableProps {
  pacientes?: ReadPacienteDto[];
  onPacienteSelected?: (paciente: ReadPacienteDto) => void;
  onPacienteUpdated?: () => void;
}

export function PacientesTable({ 
  pacientes: providedPacientes,
  onPacienteSelected,
  onPacienteUpdated 
}: PacientesTableProps) {
  
  const navigate = useNavigate();
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");

  // Selected patient for actions
  const [selectedPaciente, setSelectedPaciente] = useState<ReadPacienteDto | null>(null);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Mutation hooks
  const [deletePaciente, { isLoading: isDeleting }] = useDeletePacienteMutation();
  const [updatePaciente, { isLoading: isUpdating }] = useUpdatePacienteMutation();

  // Check if we should manage our own data
  const shouldFetchDirectly = !providedPacientes;
  
  // Only fetch data if not provided by parent
  const { data: fetchedPacientes, refetch } = useGetPacientesQuery({ 
    includeRelations: true 
  }, {
    skip: !shouldFetchDirectly,
    refetchOnMountOrArgChange: true
  });

  // Use provided pacientes or fetched ones
  const pacientes = providedPacientes || fetchedPacientes || [];

  // Filter pacientes based on search query
  const filteredPacientes = pacientes.filter(paciente => {
    if (!searchQuery) return true;
    
    const nome = paciente.nome_paciente?.toLowerCase() || '';
    const cpf = paciente.cpf?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    
    return nome.includes(query) || cpf.includes(query);
  });

  // Format date for display
  const formatDate = (date: Date) => {
    if (!date) return "-";
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('pt-BR');
  };

// Format sex for display
const formatSex = (sex: string) => {
  switch (sex) {
    case 'M':
      return 'Masculino';
    case 'F':
      return 'Feminino';
    case 'O':
      return 'Outro';
    default:
      return 'Não informado';
  }
};

const formatEstadoCivil = (estadoCivil: string) => {
    switch (estadoCivil) {
        case 'S':
        return 'Solteiro(a)';
        case 'C':
        return 'Casado(a)';
        case 'D':
        return 'Divorciado(a)';
        case 'V':
        return 'Viúvo(a)';
        default:
        return 'Não informado';
    }
};  // Handle view patient details
  const handleViewPaciente = (paciente: ReadPacienteDto) => {
    // Navigate to patient detail page
    navigate(`/prontuarios/${paciente.id}`);
    
    // Also call the callback if provided (for backward compatibility)
    if (onPacienteSelected) {
      onPacienteSelected(paciente);
    }
  };

  // Handle opening delete modal
  const handleOpenDeleteModal = (paciente: ReadPacienteDto) => {
    setSelectedPaciente(paciente);
    setIsDeleteModalOpen(true);
  };

  // Handle closing delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPaciente(null);
  };

  // Handle opening update modal
  const handleOpenUpdateModal = (paciente: ReadPacienteDto) => {
    setSelectedPaciente(paciente);
    setIsUpdateModalOpen(true);
  };

  // Handle closing update modal
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPaciente(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async (): Promise<boolean | undefined> => {
    if (!selectedPaciente) return false;
    
    try {
      await deletePaciente(selectedPaciente.id).unwrap();
      
      addToast({
        title: "Sucesso!",
        description: "Paciente excluído com sucesso.",
        color: "success",
      });
      
      // Refresh data after successful deletion
      if (shouldFetchDirectly) {
        refetch();
      } else if (onPacienteUpdated) {
        onPacienteUpdated();
      }
      
      return true;
    } catch (error) {
      addToast({
        title: "Erro",
        description: "Não foi possível excluir o paciente.",
        color: "danger",
      });
      return false;
    }
  };

  // Handle update submission
  const handleUpdateSubmit = async (data: UpdatePacienteDto): Promise<boolean | undefined> => {
    if (!selectedPaciente) return false;
    
    try {
      await updatePaciente({ id: selectedPaciente.id, body: data }).unwrap();
      
      addToast({
        title: "Sucesso!",
        description: "Paciente atualizado com sucesso.",
        color: "success",
      });
      
      // Refresh data after successful update
      if (shouldFetchDirectly) {
        refetch();
      } else if (onPacienteUpdated) {
        onPacienteUpdated();
      }
      
      return true;
    } catch (error) {
      addToast({
        title: "Erro",
        description: "Não foi possível atualizar o paciente.",
        color: "danger",
      });
      return false;
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center px-4 py-3">
          <h2 className="text-lg font-medium">
            Prontuário dos Pacientes
          </h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar por nome ou CPF..."
              className="w-64"
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button isIconOnly variant="light" size="sm">
              <FunnelIcon className="h-[18px] w-[18px]" />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-0">
          <Table aria-label="Lista de Pacientes">
            <TableHeader>
              <TableColumn>Nome</TableColumn>
              <TableColumn>CPF</TableColumn>
              <TableColumn>Data de Nascimento</TableColumn>
              <TableColumn>Sexo</TableColumn>
              <TableColumn>Estado Civil</TableColumn>
              <TableColumn>Ações</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Nenhum paciente encontrado">
              {filteredPacientes.map((paciente) => (
                <TableRow key={paciente.id}>
                  <TableCell>{paciente.nome_paciente}</TableCell>
                  <TableCell>{paciente.cpf}</TableCell>
                  <TableCell>{formatDate(paciente.dt_nascimento)}</TableCell>
                  <TableCell>{formatSex(paciente.sexo)}</TableCell>
                  <TableCell>{formatEstadoCivil(paciente.estado_civil)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        onClick={() => handleViewPaciente(paciente)}
                        aria-label="Ver detalhes"
                      >
                        <EyeIcon className="h-[18px] w-[18px]" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="default"
                        onClick={() => handleOpenUpdateModal(paciente)}
                        aria-label="Editar"
                      >
                        <PencilIcon className="h-[18px] w-[18px]" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onClick={() => handleOpenDeleteModal(paciente)}
                        aria-label="Excluir"
                      >
                        <TrashIcon className="h-[18px] w-[18px]" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Delete Modal */}
      <DeletePacienteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        paciente={selectedPaciente}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />

      {/* Update Modal */}
      <UpdatePacienteModal
        isOpen={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        paciente={selectedPaciente}
        onSubmit={handleUpdateSubmit}
        isLoading={isUpdating}
      />
    </>
  );
}
