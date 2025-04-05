import { Card, CardHeader, CardBody, Button, Input, Textarea } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ConsultaDetails({ consulta, agendamento, navigate, getStatusChip }: any) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-4">
          <Button isIconOnly color="primary" onPress={() => navigate(-1)}>
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold">Consulta #{consulta.id}</h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Consulta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Paciente</label>
                <Input
                  value={agendamento.Paciente?.nome_paciente || ""}
                  isReadOnly
                  className="mt-1 block w-full text-sm"
                />
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Entrada</label>
                <Input
                  value={new Date(consulta.dt_entrada).toLocaleString()}
                  isReadOnly
                  className="mt-1 block w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Saída</label>
                <Input
                  value={consulta.dt_saida ? new Date(consulta.dt_saida).toLocaleString() : "N/A"}
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
