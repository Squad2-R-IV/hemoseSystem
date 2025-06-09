import { Card, CardHeader, CardBody, Button, Input, Textarea, Tooltip } from "@heroui/react";
import { ArrowLeftIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { formatDateTime } from "~/utils/formatting";

export default function ConsultaDetails({ consulta, agendamento, navigate, getStatusChip }: any) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between bg-blue-50 border-b">
        <div className="flex justify-between items-center gap-4">
          <Tooltip content="Voltar">
            <Button isIconOnly onPress={() => navigate(-1)}>
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Tooltip>
          <div className="flex items-center space-x-2">
            <ClipboardDocumentCheckIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold">Consulta #{consulta.id}</h2>
          </div>
        </div>  
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Consulta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Paciente</label>
                <Link
                  viewTransition
                  to={`/prontuarios/${agendamento.Paciente?.id}`}
                  className="block text-sm text-blue-600 hover:underline"
                >
                  <Input
                    value={agendamento.Paciente?.nome_paciente || ""}
                    isReadOnly
                    className="mt-1 block w-full text-sm cursor-pointer"
                  /></Link>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Médico</label>
                <Input
                  value={agendamento.Usuario?.name || ""}
                  isReadOnly
                  className="mt-1 block w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1 block w-full text-sm">
                  {getStatusChip(consulta.status)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Procedimento</label>
                <Input
                  value={consulta.procedimento}
                  isReadOnly
                  className="mt-1 block w-full text-sm"
                />
              </div>              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Entrada</label>
                <Input
                  value={formatDateTime(consulta.dt_entrada)}
                  isReadOnly
                  className="mt-1 block w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Saída</label>
                <Input
                  value={consulta.dt_saida ? formatDateTime(consulta.dt_saida) : "N/A"}
                  isReadOnly
                  className="mt-1 block w-full text-sm"
                />
              </div>
              <div className="col-span-1 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Observações</label>
                <Textarea
                  value={consulta.observacoes}
                  isReadOnly
                  className="mt-1 block w-full text-sm h-20 resize-y"
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
