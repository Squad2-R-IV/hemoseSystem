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
} from "@heroui/react";
import { CreatePacienteDto } from "~/Dtos/Paciente/CreatePacienteDto";
import { Sexo, EstadoCivil } from "~/utils/enums/enums";

interface PacienteModalProps {
  onClose: () => void;
  onSubmit: (data: CreatePacienteDto) => void;
}

export function PacienteModal({ onClose, onSubmit }: PacienteModalProps) {
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
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>Cadastrar Paciente</ModalHeader>
        <ModalBody>
          <form>
            <Input
              name="nome_paciente"
              label="Nome"
              placeholder="Nome do Paciente"
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              name="dt_nascimento"
              label="Data de Nascimento"
              type="date"
              placeholder="Selecione a data de nascimento"
              onChange={handleChange}
              className="mb-4"
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
            </Select>
            <Input
              name="endereco"
              label="Endereço"
              placeholder="Digite o endereço"
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              name="cpf"
              label="CPF"
              placeholder="Digite o CPF"
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              name="cpf_acompanhante"
              label="CPF do Acompanhante"
              placeholder="Digite o CPF do acompanhante"
              onChange={handleChange}
              className="mb-4"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onSubmit(formData)}>
            Salvar
          </Button>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
