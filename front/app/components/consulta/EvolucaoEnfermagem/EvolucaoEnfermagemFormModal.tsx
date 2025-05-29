import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  addToast
} from "@heroui/react";
import type { ReadEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/ReadEvolucaoEnfermagemDto";
import type { CreateEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/CreateEvolucaoEnfermagemDto";
import type { UpdateEvolucaoEnfermagemDto } from "~/Dtos/EvolucaoEnfermagem/UpdateEvolucaoEnfermagemDto";
import { 
  useCreateEvolucaoEnfermagemMutation, 
  useUpdateEvolucaoEnfermagemMutation 
} from "~/services/api";

interface EvolucaoEnfermagemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultaId: number;
  funcionarioId: string;
  evolucaoEnfermagem?: ReadEvolucaoEnfermagemDto | null;
  onSuccess?: () => void;
}

export default function EvolucaoEnfermagemFormModal({
  isOpen,
  onClose,
  consultaId,
  funcionarioId,
  evolucaoEnfermagem,
  onSuccess,
}: EvolucaoEnfermagemFormModalProps) {
  const [formData, setFormData] = useState({
    dt_evolucao: "",
    sinais_vitais: "",
    conduta_enfermagem: "",
    observacoes: "",
  });

  const [createEvolucaoEnfermagem, { isLoading: isCreating }] = useCreateEvolucaoEnfermagemMutation();
  const [updateEvolucaoEnfermagem, { isLoading: isUpdating }] = useUpdateEvolucaoEnfermagemMutation();

  const isEditing = !!evolucaoEnfermagem;
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (isOpen) {
      if (evolucaoEnfermagem) {
        // Editing mode
        setFormData({
          dt_evolucao: new Date(evolucaoEnfermagem.dt_evolucao).toISOString().slice(0, 16),
          sinais_vitais: evolucaoEnfermagem.sinais_vitais || "",
          conduta_enfermagem: evolucaoEnfermagem.conduta_enfermagem || "",
          observacoes: evolucaoEnfermagem.observacoes || "",
        });
      } else {
        // Creating mode
        const now = new Date();
        setFormData({
          dt_evolucao: now.toISOString().slice(0, 16),
          sinais_vitais: "",
          conduta_enfermagem: "",
          observacoes: "",
        });
      }
    }
  }, [isOpen, evolucaoEnfermagem]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    if (!formData.dt_evolucao) {
      addToast({
        title: "Erro de Validação",
        description: "Data e hora da evolução são obrigatórias",
        color: "danger",
      });
      return;
    }

    if (!formData.conduta_enfermagem && !formData.sinais_vitais && !formData.observacoes) {
      addToast({
        title: "Erro de Validação",
        description: "Pelo menos um campo de conteúdo deve ser preenchido",
        color: "danger",
      });
      return;
    }

    try {
      if (isEditing && evolucaoEnfermagem) {
        const updateData: UpdateEvolucaoEnfermagemDto = {
          id_consulta: consultaId,
          id_funcionario: funcionarioId,
          dt_evolucao: new Date(formData.dt_evolucao),
          sinais_vitais: formData.sinais_vitais || null,
          conduta_enfermagem: formData.conduta_enfermagem || null,
          observacoes: formData.observacoes || null,
        };

        await updateEvolucaoEnfermagem({
          id: evolucaoEnfermagem.id,
          body: updateData,
        }).unwrap();

        addToast({
          title: "Sucesso",
          description: "Evolução de enfermagem atualizada com sucesso!",
          color: "success",
        });
      } else {
        const createData: CreateEvolucaoEnfermagemDto = {
          id_consulta: consultaId,
          id_funcionario: funcionarioId,
          dt_evolucao: new Date(formData.dt_evolucao),
          sinais_vitais: formData.sinais_vitais || null,
          conduta_enfermagem: formData.conduta_enfermagem || null,
          observacoes: formData.observacoes || null,
        };

        await createEvolucaoEnfermagem(createData).unwrap();
        
        addToast({
          title: "Sucesso",
          description: "Evolução de enfermagem criada com sucesso!",
          color: "success",
        });
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar evolução de enfermagem:", error);
      addToast({
        title: "Erro",
        description: "Erro ao salvar evolução de enfermagem",
        color: "danger",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-bold">
            {isEditing ? "Editar" : "Nova"} Evolução de Enfermagem
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Data e Hora"
              type="datetime-local"
              value={formData.dt_evolucao}
              onChange={(e) => handleInputChange("dt_evolucao", e.target.value)}
              isRequired
            />

            <Textarea
              label="Sinais Vitais"
              placeholder="Ex: PA: 120x80 mmHg, FC: 72 bpm, T: 36.5°C, FR: 18 ipm, SpO2: 98%"
              value={formData.sinais_vitais}
              onChange={(e) => handleInputChange("sinais_vitais", e.target.value)}
              minRows={3}
            />

            <Textarea
              label="Conduta de Enfermagem"
              placeholder="Descreva as condutas de enfermagem realizadas..."
              value={formData.conduta_enfermagem}
              onChange={(e) => handleInputChange("conduta_enfermagem", e.target.value)}
              minRows={4}
            />

            <Textarea
              label="Observações"
              placeholder="Observações adicionais..."
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              minRows={3}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button 
            color="primary" 
            onPress={handleSubmit}
            isLoading={isLoading}
          >
            {isEditing ? "Atualizar" : "Criar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
