import React, { useState } from "react";
import { useDisclosure } from "@heroui/react";
import AnamneseDetails from "~/components/ambulatorio/AnamneseDetails";
import CreateAnamneseModal from "~/components/ambulatorio/CreateAnamneseModal";
import { useCreateAnamneseMutation } from "~/services/siahme-api.service";
import type { CreateAnamneseDto } from "~/Dtos/Anamnese/CreateAnamneseDto";
import type { ReadAnamneseDto } from "~/Dtos/Anamnese/ReadAnamneseDto";
import { useAuth } from "~/contexts/AuthContext";

interface AnamneseContainerProps {
  anamnese?: ReadAnamneseDto;
  consultaId: number;
  onRefetch: () => void;
}

export default function AnamneseContainer({
  anamnese,
  consultaId,
  onRefetch,
}: AnamneseContainerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createAnamnese] = useCreateAnamneseMutation();
  const { userId } = useAuth();

  const [formData, setFormData] = useState<CreateAnamneseDto>(() => ({
    id_consulta: 0,
    id_funcionario: "",
    cid: "",
    queixa_principal: "",
    historia_doenca_atual: "",
    antecedentes_pessoais: "",
    antecedentes_familiares: "",
    habitos_vida: "",
    medicamentos_em_uso: "",
    alergias: "",
    cirurgias_previas: "",
    observacoes: "",
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAnamnese = async () => {
    try {
      const anamneseData = {
        ...formData,
        id_consulta: consultaId,
        id_funcionario: userId || "",
      };
      
      await createAnamnese(anamneseData).unwrap();
      onClose();
      onRefetch();
    } catch (error) {
      console.error("Error creating anamnese:", error);
    }
  };

  return (
    <>
      <AnamneseDetails anamnese={anamnese} onOpen={onOpen} />
      
      <CreateAnamneseModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleCreateAnamnese={handleCreateAnamnese}
      />
    </>
  );
}
