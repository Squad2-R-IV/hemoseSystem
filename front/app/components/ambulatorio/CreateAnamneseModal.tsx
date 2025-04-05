import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
} from "@heroui/react";

export default function CreateAnamneseModal({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleCreateAnamnese,
}: any) {
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      scrollBehavior="inside"
      placement="top-center"
      onOpenChange={onClose}
    >
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>Adicionar Anamnese</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="CID"
                  name="cid"
                  value={formData.cid}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Queixa Principal"
                  name="queixa_principal"
                  value={formData.queixa_principal}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="História da Doença Atual"
                  name="historia_doenca_atual"
                  value={formData.historia_doenca_atual}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Antecedentes Pessoais"
                  name="antecedentes_pessoais"
                  value={formData.antecedentes_pessoais}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Antecedentes Familiares"
                  name="antecedentes_familiares"
                  value={formData.antecedentes_familiares}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Hábitos de Vida"
                  name="habitos_vida"
                  value={formData.habitos_vida}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Medicamentos em Uso"
                  name="medicamentos_em_uso"
                  value={formData.medicamentos_em_uso}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Alergias"
                  name="alergias"
                  value={formData.alergias}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Cirurgias Prévias"
                  name="cirurgias_previas"
                  value={formData.cirurgias_previas}
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Observações"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onPress={close}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleCreateAnamnese}>
                Salvar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
