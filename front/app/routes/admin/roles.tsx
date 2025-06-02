import React from "react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { ArrowLeftIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import RoleManagement from "~/components/admin/RoleManagement";
import { useNavigate } from "react-router";


export default function RolesPage() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onPress={() => navigate(-1)}
          isIconOnly
          variant="flat"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <ShieldCheckIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Roles</h1>
          <p className="text-default-600">Gerencie as funções do sistema</p>
        </div>
      </div>

      <RoleManagement />
    </div>
  );
}
