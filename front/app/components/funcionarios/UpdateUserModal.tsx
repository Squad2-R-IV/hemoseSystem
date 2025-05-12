import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@heroui/react";
import { UpdateUserDto } from "~/Dtos/User/UpdateUser.dto";
import { ReadUserDto } from "~/Dtos/User/ReadUser.dto";

interface UpdateUserModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  user: ReadUserDto | null;
  onSubmit: (data: UpdateUserDto) => Promise<boolean | undefined>;
  isLoading: boolean;
}

const healthRoles = ["medico", "fisioterapeuta", "enfermeiro", "nutricionista", "dentista"];

export function UpdateUserModal({
  isOpen,
  onOpenChange,
  onClose,
  user,
  onSubmit,
  isLoading,
}: UpdateUserModalProps) {
  const [formData, setFormData] = useState<UpdateUserDto>({
    name: "",
    email: "",
    cpf: "",
    contato: "",
    especialidade: "",
    conselho: "",
    registro: "",
  });
  const location = window.location.pathname; // /funcionarios/gestor

    const role = location.split("/").pop(); // gestor
    console.log(role);
    const isHealthRole = healthRoles.includes(role || "");
  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        cpf: user.cpf || "",
        contato: user.contato || "",
        especialidade: isHealthRole ? user.especialidade || "" : "",
        conselho: isHealthRole ? user.conselho || "" : "",
        registro: isHealthRole ? user.registro || "" : "",
      });
    }
  }, [user, isHealthRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // If not a health role, remove health-specific fields before submitting
    const dataToSubmit = isHealthRole
      ? formData
      : {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          contato: formData.contato,
        };

    const success = await onSubmit(dataToSubmit);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Atualizar Funcionário</ModalHeader>
        <ModalBody>
          <form>
            <Input
              name="name"
              label="Nome"
              placeholder="Nome do Funcionário"
              value={formData.name}
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              name="email"
              label="Email"
              placeholder="Email"
              value={formData.email}
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
              name="contato"
              label="Contato"
              placeholder="Digite o contato"
              value={formData.contato}
              onChange={handleChange}
              className="mb-4"
            />

            {isHealthRole && (
              <>
                <Input
                  name="especialidade"
                  label="Especialidade"
                  placeholder="Digite a especialidade"
                  value={formData.especialidade}
                  onChange={handleChange}
                  className="mb-4"
                />
                <Input
                  name="conselho"
                  label="Conselho"
                  placeholder="Digite o conselho (ex: CRM, COREN)"
                  value={formData.conselho}
                  onChange={handleChange}
                  className="mb-4"
                  readOnly
                />
                <Input
                  name="registro"
                  label="Registro"
                  placeholder="Digite o número de registro"
                  value={formData.registro}
                  onChange={handleChange}
                  className="mb-4"
                />
              </>
            )}
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
