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
import { CreatePacienteDto } from "~/Dtos/Paciente/CreatePacienteDto";
import { Sexo, EstadoCivil } from "~/utils/enums/enums";
import { useCreatePacienteMutation } from "~/services/siahme-api.service";
import { formatDateForInput } from "~/utils/recepcao/utils";

interface PacienteModalProps {
  onClose: () => void;
}

export function PacienteModal({ onClose }: PacienteModalProps) {
  const [createPaciente, { isLoading }] = useCreatePacienteMutation();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<CreatePacienteDto>({
    nome_paciente: "",
    dt_nascimento: new Date(),
    sexo: "M",
    estado_civil: "S",
    endereco: "",
    cpf: "",
    cpf_acompanhante: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "dt_nascimento" ? new Date(value) : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nome_paciente.trim()) {
      newErrors.nome_paciente = "Nome do paciente é obrigatório";
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createPaciente(formData).unwrap();
      addToast({
        title: "Sucesso",
        description: "Paciente cadastrado com sucesso!",
        color: "success",
      });
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      addToast({
        title: "Erro",
        description: "Erro ao cadastrar paciente. Tente novamente.",
        color: "danger",
      });    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>Cadastrar Paciente</ModalHeader>
        <ModalBody>
          <form>            <Input
              name="nome_paciente"
              label="Nome"
              placeholder="Nome do Paciente"
              onChange={handleChange}
              className="mb-4"
              value={formData.nome_paciente}
              isInvalid={!!errors.nome_paciente}
              errorMessage={errors.nome_paciente}
            />
            <Input
              name="dt_nascimento"
              label="Data de Nascimento"
              type="date"
              placeholder="Selecione a data de nascimento"
              onChange={handleChange}
              className="mb-4"
              value={formatDateForInput(formData.dt_nascimento)}
            />
            <Select
              name="sexo"
              label="Sexo"
              placeholder="Selecione o sexo"
              onChange={handleChange}
              className="mb-4"
              value={formData.sexo}
            >
              {Object.entries(Sexo).map(([key, label]) => (
                <SelectItem key={key}>
                  {label}
                </SelectItem>
              ))}
            </Select>
            <Select
              name="estado_civil"
              label="Estado Civil"
              placeholder="Selecione o estado civil"
              onChange={handleChange}
              className="mb-4"
              value={formData.estado_civil}
            >
              {Object.entries(EstadoCivil).map(([key, label]) => (
                <SelectItem key={key}>
                  {label}
                </SelectItem>
              ))}
            </Select>            <Input
              name="endereco"
              label="Endereço"
              placeholder="Digite o endereço"
              onChange={handleChange}
              className="mb-4"
              value={formData.endereco}
              isInvalid={!!errors.endereco}
              errorMessage={errors.endereco}
            />
            <Input
              name="cpf"
              label="CPF"
              placeholder="Digite o CPF"
              onChange={handleChange}
              className="mb-4"
              value={formData.cpf}
              isInvalid={!!errors.cpf}
              errorMessage={errors.cpf}
            />
            <Input
              name="cpf_acompanhante"
              label="CPF do Acompanhante"
              placeholder="Digite o CPF do acompanhante"
              onChange={handleChange}
              className="mb-4"
              value={formData.cpf_acompanhante}
            />
            {Object.keys(errors).length > 0 && (
              <div className="mb-4 text-red-500">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
          </form>
        </ModalBody>        <ModalFooter>
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
  );
}
