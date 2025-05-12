import React, { useEffect, useState } from "react";
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
  Spinner,
} from "@heroui/react";
import { UpdatePacienteDto } from "~/Dtos/Paciente/UpdatePacienteDto";
import { ReadPacienteDto } from "~/Dtos/Paciente/ReadPacienteDto";
import { Sexo, EstadoCivil } from "~/utils/enums/enums";

interface UpdatePacienteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  paciente: ReadPacienteDto | null;
  onSubmit: (data: UpdatePacienteDto) => Promise<boolean | undefined>;
  isLoading: boolean;
}

export function UpdatePacienteModal({ 
  isOpen, 
  onOpenChange, 
  onClose, 
  paciente, 
  onSubmit,
  isLoading 
}: UpdatePacienteModalProps) {
  const [formData, setFormData] = useState<UpdatePacienteDto>({
    nome_paciente: "",
    dt_nascimento: new Date(),
    sexo: "M" as Sexo,
    estado_civil: "S" as EstadoCivil,
    endereco: "",
    cpf: "",
    cpf_acompanhante: "",
  });

  // Update form data when paciente changes
  useEffect(() => {
    if (paciente) {
      setFormData({
        nome_paciente: paciente.nome_paciente || "",
        dt_nascimento: paciente.dt_nascimento || new Date(),
        sexo: paciente.sexo as Sexo || "M",
        estado_civil: paciente.estado_civil as EstadoCivil || "S",
        endereco: paciente.endereco || "",
        cpf: paciente.cpf || "",
        cpf_acompanhante: paciente.cpf_acompanhante || "",
      });
    }
  }, [paciente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "dt_nascimento" ? new Date(value) : value
    }));
  };

  const handleSubmit = async () => {
    const success = await onSubmit(formData);
    if (success) {
      onClose();
    }
  };

  // Format date for input field
  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Atualizar Paciente</ModalHeader>
        <ModalBody>
          <form>
            <Input
              name="nome_paciente"
              label="Nome"
              placeholder="Nome do Paciente"
              value={formData.nome_paciente}
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              name="dt_nascimento"
              label="Data de Nascimento"
              type="date"
              placeholder="Selecione a data de nascimento"
              value={formatDateForInput(formData.dt_nascimento)}
              onChange={handleChange}
              className="mb-4"
            />
            <Select
              name="sexo"
              label="Sexo"
              placeholder="Selecione o sexo"
              onChange={handleChange}
              className="mb-4"
              selectedKeys={[formData.sexo]}
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
              selectedKeys={[formData.estado_civil]}
            >
              {Object.entries(EstadoCivil).map(([key, label]) => (
                <SelectItem key={key} >
                  {label}
                </SelectItem>
              ))}
            </Select>
            <Input
              name="endereco"
              label="Endereço"
              placeholder="Digite o endereço"
              value={formData.endereco}
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              name="cpf"
              label="CPF"
              placeholder="Digite o CPF"
              value={formData.cpf}
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              name="cpf_acompanhante"
              label="CPF do Acompanhante"
              placeholder="Digite o CPF do acompanhante"
              value={formData.cpf_acompanhante}
              onChange={handleChange}
              className="mb-4"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            onPress={handleSubmit}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Salvar"}
          </Button>
          <Button variant="light" onPress={onClose} isDisabled={isLoading}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}