import { Card, CardHeader, CardBody, Input, Textarea, Button, Tooltip, Divider } from "@heroui/react";
import { 
  ClipboardDocumentCheckIcon, 
  ExclamationCircleIcon, 
  HeartIcon, 
  UserGroupIcon, 
  FireIcon, 
  BeakerIcon, 
  ExclamationTriangleIcon,
  ScissorsIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface AnamneseDetailsProps {
  anamnese: any;
  onOpen: () => void;
}

export default function AnamneseDetails({ anamnese, onOpen }: AnamneseDetailsProps) {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex items-center justify-between bg-blue-50 border-b">
        <div className="flex items-center space-x-2">
          <ClipboardDocumentCheckIcon className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold">Anamnese</h3>
        </div>
      </CardHeader>
      <CardBody className="max-h-[400px] overflow-y-auto">
        {anamnese ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-blue-700 font-medium">
                <DocumentTextIcon className="h-5 w-5" />
                <div>CID</div>
              </div>
              <Input value={anamnese.cid} isReadOnly className="bg-white" />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <div>Queixa Principal</div>
              </div>
              <Textarea
                value={anamnese.queixa_principal || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <Divider className="my-3" />

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                <div>História da Doença Atual</div>
              </div>
              <Textarea
                value={anamnese.historia_doenca_atual || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <HeartIcon className="h-5 w-5 text-red-500" />
                <div>Antecedentes Pessoais</div>
              </div>
              <Textarea
                value={anamnese.antecedentes_pessoais || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <UserGroupIcon className="h-5 w-5 text-green-500" />
                <div>Antecedentes Familiares</div>
              </div>
              <Textarea
                value={anamnese.antecedentes_familiares || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <FireIcon className="h-5 w-5 text-orange-500" />
                <div>Hábitos de Vida</div>
              </div>
              <Textarea
                value={anamnese.habitos_vida || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <BeakerIcon className="h-5 w-5 text-purple-500" />
                <div>Medicamentos em Uso</div>
              </div>
              <Textarea
                value={anamnese.medicamentos_em_uso || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                <div>Alergias</div>
              </div>
              <Textarea
                value={anamnese.alergias || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <ScissorsIcon className="h-5 w-5 text-gray-500" />
                <div>Cirurgias Prévias</div>
              </div>
              <Textarea
                value={anamnese.cirurgias_previas || ""}
                isReadOnly
                className="bg-white"
              />
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                <div>Observações</div>
              </div>
              <Textarea
                value={anamnese.observacoes || ""}
                isReadOnly
                className="bg-white"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
            <ExclamationCircleIcon className="h-12 w-12 text-gray-400" />
            <p className="text-gray-600">Nenhuma anamnese encontrada para esta consulta.</p>
            <Button color="primary" startContent={<PencilSquareIcon className="h-5 w-5" />} onPress={onOpen}>
              Adicionar Anamnese
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
