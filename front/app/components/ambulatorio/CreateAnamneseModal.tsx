import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
  Divider,
} from "@heroui/react";
import {
  ClipboardDocumentCheckIcon,
  ExclamationCircleIcon,
  HeartIcon,
  UserGroupIcon,
  FireIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ScissorsIcon,
  DocumentTextIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface CreateAnamneseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreateAnamnese: () => Promise<void>;
}

export default function CreateAnamneseModal({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleCreateAnamnese,
}: CreateAnamneseModalProps) {
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
            <ModalHeader className="flex items-center bg-blue-50 border-b">
              <div className="flex items-center space-x-2">
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold">Adicionar Anamnese</h3>
              </div>
            </ModalHeader>
            <ModalBody className="max-h-[70vh] overflow-y-auto">
              <div className="space-y-4 p-2">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-blue-700 font-medium">
                    <DocumentTextIcon className="h-5 w-5" />
                    <div>CID</div>
                  </div>
                  <Input
                    name="cid"
                    value={formData.cid}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Informe o CID"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <div>Queixa Principal</div>
                  </div>
                  <Textarea
                    name="queixa_principal"
                    value={formData.queixa_principal}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Descreva a queixa principal do paciente"
                  />
                </div>

                <Divider className="my-3" />

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                    <div>História da Doença Atual</div>
                  </div>
                  <Textarea
                    name="historia_doenca_atual"
                    value={formData.historia_doenca_atual}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Descreva a história da doença atual"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <HeartIcon className="h-5 w-5 text-red-500" />
                    <div>Antecedentes Pessoais</div>
                  </div>
                  <Textarea
                    name="antecedentes_pessoais"
                    value={formData.antecedentes_pessoais}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Informe os antecedentes pessoais"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <UserGroupIcon className="h-5 w-5 text-green-500" />
                    <div>Antecedentes Familiares</div>
                  </div>
                  <Textarea
                    name="antecedentes_familiares"
                    value={formData.antecedentes_familiares}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Informe os antecedentes familiares"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <FireIcon className="h-5 w-5 text-orange-500" />
                    <div>Hábitos de Vida</div>
                  </div>
                  <Textarea
                    name="habitos_vida"
                    value={formData.habitos_vida}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Informe os hábitos de vida do paciente"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <BeakerIcon className="h-5 w-5 text-purple-500" />
                    <div>Medicamentos em Uso</div>
                  </div>
                  <Textarea
                    name="medicamentos_em_uso"
                    value={formData.medicamentos_em_uso}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Informe os medicamentos em uso"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                    <div>Alergias</div>
                  </div>
                  <Textarea
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Informe as alergias do paciente"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <ScissorsIcon className="h-5 w-5 text-gray-500" />
                    <div>Cirurgias Prévias</div>
                  </div>
                  <Textarea
                    name="cirurgias_previas"
                    value={formData.cirurgias_previas}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Informe as cirurgias prévias"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                    <div>Observações</div>
                  </div>
                  <Textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    className="bg-white"
                    placeholder="Observações adicionais"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={close}
                startContent={<XMarkIcon className="h-5 w-5" />}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={handleCreateAnamnese}
                startContent={<CheckIcon className="h-5 w-5" />}
              >
                Salvar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
