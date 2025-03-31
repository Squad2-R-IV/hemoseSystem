import { useParams, useNavigate } from "react-router";
import { useGetConsultaByIdQuery } from "~/services/siahme-api.service";
import type { Route } from "../+types/home";
import { Card, CardHeader, CardBody, Spinner, Button } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Consulta" },
    { name: "description", content: "Detalhes da consulta" },
  ];
}

export default function ConsultaRoute() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: consulta, isLoading } = useGetConsultaByIdQuery({
    id: Number(id),
    includeRelations: true
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!consulta) {
    return <div>Consulta não encontrada</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center gap-4">
            <Button
              isIconOnly
              color="primary"
              onPress={() => navigate(-1)}
            >
              <ArrowLeftIcon className="h-5 w-5"/>
            </Button>
            <h2 className="text-xl font-bold">Consulta #{consulta.id}</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            <p><strong>Status:</strong> {consulta.status}</p>
            <p><strong>Codigo consulta:</strong> {consulta.id}</p>

          </div>
        </CardBody>
      </Card>
    </div>
  );
}
