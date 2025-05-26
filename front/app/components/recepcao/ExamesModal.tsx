import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { tipo_exame_enum, status_exame_enum } from "~/utils/enums/enums";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useGetPacientesQuery } from "~/services/siahme-api.service";
import { SearchModal } from "../SearchModal";
import type { CreateExameDto } from "~/Dtos/Exame/CreateExameDto";
import { useCreateExameWithFiles } from "~/hooks/useCreateExameWithFiles";

interface ExamesModalProps {
  onClose: () => void;
}

export function ExamesModal({ onClose }: ExamesModalProps) {
  const [isPacienteSearchModalOpen, setPacienteSearchModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { createExameWithFiles, isLoading } = useCreateExameWithFiles({
    onSuccess: () => {
      addToast({
        title: "Sucesso!",
        description: "Exame criado com sucesso",
        color: "success"
      });
      onClose();
    },
    onError: (error) => {
      console.error("Erro ao criar exame:", error);
    }
  });

  const [formData, setFormData] = useState<CreateExameDto>({
    id_paciente: 0,
    tipo_do_exame: tipo_exame_enum.SANGUE,
    dt_exame: new Date(),
    crm_profissional_responsavel: "",
    profissional_responsavel: "",
    status: status_exame_enum.PENDENTE,
    resultado: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "dt_exame" ? new Date(value) : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.id_paciente === 0) {
      newErrors.id_paciente = "Selecione um paciente";
    }

    if (!formData.profissional_responsavel.trim()) {
      newErrors.profissional_responsavel = "Profissional responsável é obrigatório";
    }

    if (!formData.crm_profissional_responsavel.trim()) {
      newErrors.crm_profissional_responsavel = "CRM do profissional é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createExameWithFiles(formData, selectedFiles);
    } catch (error) {
      // Error handling is done in the hook
      console.error("Erro ao cadastrar exame:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
    
    if (files && files.length > 0) {
      addToast({
        title: "Arquivos selecionados",
        description: `${files.length} arquivo(s) selecionado(s)`,
        color: "primary"
      });
    }
  };

  const handlePacienteSelect = (paciente: { id: number; nome_paciente: string }) => {
    if (paciente && paciente.id && paciente.nome_paciente) {
      setFormData((prev) => ({ ...prev, id_paciente: paciente.id }));
      setSelectedPaciente(paciente.nome_paciente);
    } else {
      console.error("Paciente inválido selecionado:", paciente);
    }
    setPacienteSearchModalOpen(false);
  };

  // Format date for input field
  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };
  return (
    <>
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Cadastrar Exame</ModalHeader>
          <ModalBody>
            <form>              <Input
              name="paciente"
              label="Paciente"
              placeholder="Selecione o paciente"
              value={selectedPaciente || ""}
              readOnly
              isInvalid={!!errors.id_paciente}
              errorMessage={errors.id_paciente}
              endContent={
                <Button
                  isIconOnly
                  aria-label="Buscar Paciente"
                  onPress={() => setPacienteSearchModalOpen(true)}
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </Button>
              }
              className="mb-4"
            /><Select
              name="tipo_do_exame"
              label="Tipo do Exame"
              placeholder="Selecione o tipo do exame"
              onChange={handleChange}
              className="mb-4"
              selectedKeys={[formData.tipo_do_exame]}
            >
                {Object.entries(tipo_exame_enum).map(([key, label]) => (
                  <SelectItem key={key}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                name="dt_exame"
                label="Data do Exame"
                type="date"
                placeholder="Selecione a data do exame"
                value={formatDateForInput(formData.dt_exame)}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                name="profissional_responsavel"
                label="Profissional Responsável"
                placeholder="Digite o nome do profissional responsável"
                onChange={handleChange}
                className="mb-4"
                value={formData.profissional_responsavel}
                isInvalid={!!errors.profissional_responsavel}
                errorMessage={errors.profissional_responsavel}
              />
              <Input
                name="crm_profissional_responsavel"
                label="CRM do Profissional"
                placeholder="Digite o CRM do profissional responsável"
                onChange={handleChange}
                className="mb-4"
                value={formData.crm_profissional_responsavel}
                isInvalid={!!errors.crm_profissional_responsavel}
                errorMessage={errors.crm_profissional_responsavel}
              /><Select
                name="status"
                label="Status do Exame"
                placeholder="Selecione o status do exame"
                onChange={handleChange}
                className="mb-4"
                selectedKeys={[formData.status]}
              >
                {Object.entries(status_exame_enum).map(([key, label]) => (
                  <SelectItem key={key}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                name="resultado"
                label="Resultado"
                placeholder="Digite o resultado (opcional)"
                onChange={handleChange}
                className="mb-4"
                value={formData.resultado}
              />              <Input
                type="file"
                name="arquivo"
                color="primary"
                label="Anexar Arquivos"
                placeholder="Selecione arquivos (opcional)"
                onChange={handleFileChange}
                className="mb-4"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
              />
              {selectedFiles && selectedFiles.length > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Arquivos selecionados ({selectedFiles.length}):
                  </p>
                  {Array.from(selectedFiles).map((file, index) => (
                    <div key={index} className="text-xs text-gray-600 flex justify-between">
                      <span>{file.name}</span>
                      <span>({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </ModalBody>          <ModalFooter>
            <Button
              color="primary"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
            <Button variant="light" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isPacienteSearchModalOpen && (
        <SearchModal
          title="Buscar Paciente"
          onClose={() => setPacienteSearchModalOpen(false)}
          onSelect={handlePacienteSelect}
          useQuery={useGetPacientesQuery}
          itemLabelKey="nome_paciente"
          queryParams={{ includeRelations: false }}
          columns={[
            { label: "Nome", key: "nome_paciente" },
            { label: "CPF", key: "cpf" },
          ]}
        />
      )}
    </>
  );
}
