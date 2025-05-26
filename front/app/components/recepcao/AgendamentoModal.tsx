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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CreateAgendamentoDto } from "~/Dtos/Agendamento/CreateAgendamentoDto";
import { TipoAgendamentoEnum, StatusAgendamentoEnum } from "~/utils/enums/enums";
import { useGetPacientesQuery, useGetMedicosQuery } from "~/services/siahme-api.service";
import { SearchModal } from "../SearchModal";


interface AgendamentoModalProps {
  onClose: () => void;
  onSubmit: (data: CreateAgendamentoDto) => void;
}

export function AgendamentoModal({ onClose, onSubmit }: AgendamentoModalProps) {
  const [formData, setFormData] = useState<CreateAgendamentoDto>({
    id_paciente: 0,
    id_funcionario: "",
    dt_agendamento: new Date(),
    dt_hora_agendamento: 8,
    dt_chegada: undefined,
    tipo_agendamento: TipoAgendamentoEnum.Consulta,
    status_agendamento: StatusAgendamentoEnum.Agendado,
    observacoes: "",
  });

  const [isPacienteSearchModalOpen, setPacienteSearchModalOpen] = useState(false);
  const [isMedicoSearchModalOpen, setMedicoSearchModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<string | null>(null);
  const [selectedMedico, setSelectedMedico] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dt_agendamento" ? new Date(value) : name === "dt_hora_agendamento" ? parseInt(value) : value,
    }));
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

  const formatHour = (hour: number) => `${hour.toString().padStart(2, '0')}:00`;
  
  const handleMedicoSelect = (medico: { id: string; name: string }) => {
    setFormData((prev) => ({ ...prev, id_funcionario: medico.id }));
    setSelectedMedico(medico.name);
    setMedicoSearchModalOpen(false);
  };

  return (
    <>
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Cadastrar Agendamento</ModalHeader>
          <ModalBody>
            <form>
              <Input
                name="paciente"
                label="Paciente"
                placeholder="Selecione o paciente"
                value={selectedPaciente || ""}
                readOnly
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
              />
              <Input
                name="medico"
                label="Médico"
                placeholder="Selecione o médico"
                value={selectedMedico || ""}
                readOnly
                endContent={
                  <Button
                    isIconOnly
                    aria-label="Buscar Médico"
                    onPress={() => setMedicoSearchModalOpen(true)}
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </Button>
                }
                className="mb-4"
              />
              <Input
                name="dt_agendamento"
                label="Data do Agendamento"
                type="date"
                placeholder="Selecione a data do agendamento"
                onChange={handleChange}
                className="mb-4"
              />
              <Select
                name="dt_hora_agendamento"
                label="Hora do Agendamento"
                placeholder="Selecione a hora"
                onChange={handleChange}
                className="mb-4"
                value={formData.dt_hora_agendamento?.toString()}
                selectedKeys={formData.dt_hora_agendamento ? [formData.dt_hora_agendamento.toString()] : []}
              >
                {Array.from({ length: 13 }, (_, i) => i + 6).map((hour) => (
                  <SelectItem key={hour}>
                    {formatHour(hour)}
                  </SelectItem>
                ))}
              </Select>
              <Select
                name="tipo_agendamento"
                label="Tipo de Agendamento"
                placeholder="Selecione o tipo de agendamento"
                onChange={handleChange}
                className="mb-4"
                value={formData.tipo_agendamento}
              >
                {Object.entries(TipoAgendamentoEnum).map(([key, label]) => (
                  <SelectItem key={key}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                name="observacoes"
                label="Observações"
                placeholder="Digite as observações"
                onChange={handleChange}
                className="mb-4"
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={() => onSubmit(formData)}>
              Salvar
            </Button>
            <Button variant="light" onPress={onClose}>
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

      {isMedicoSearchModalOpen && (
        <SearchModal
          title="Buscar Médico"
          onClose={() => setMedicoSearchModalOpen(false)}
          onSelect={handleMedicoSelect}
          useQuery={useGetMedicosQuery}
          itemLabelKey="nome"
          columns={[
            { label: "Nome", key: "name" },
            { label: "Especialidade", key: "especialidade" },
            { label: "CRM", key: "registro" },
          ]}
        />
      )}
    </>
  );
}
