import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
  Spinner,
} from "@heroui/react";
import {
  ShieldCheckIcon,
  UserGroupIcon,
  KeyIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { Link as RouteLink } from "react-router";
import { usePermissionStats } from "~/hooks/usePermissions";
import {
  useGetRolesQuery,
  useGetPermissionsQuery,
  useGetUsersQuery,
} from "~/services/api";
import RoleManagement from "~/components/admin/RoleManagement";
import PermissionManagement from "~/components/admin/PermissionManagement";
import UserRoleAssignment from "~/components/admin/UserRoleAssignment";


export default function PermissionsPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery({});
  const { data: permissions, isLoading: permissionsLoading } = useGetPermissionsQuery({});
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { stats, isLoading: statsLoading } = usePermissionStats();

  const isLoading = rolesLoading || permissionsLoading || usersLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  interface OverviewCard {
    title: string;
    value: number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: "primary" | "secondary" | "success" | "default" | "warning" | "danger" | undefined;
    link?: string | null;
  }

  const overviewCards : OverviewCard[] = [
    {
      title: "Roles Totais",
      value: roles?.length || 0,
      icon: UserGroupIcon,
      color: "primary",
      link: "/admin/roles"
    },
    {
      title: "Permissões Totais",
      value: permissions?.length || 0,
      icon: KeyIcon,
      color: "secondary",
      link: null
    },
    {
      title: "Usuários Totais",
      value: users?.length || 0,
      icon: ShieldCheckIcon,
      color: "success",
      link: "/funcionarios"
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheckIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Gerenciamento de Permissões</h1>
      </div>

      <Tabs
        aria-label="Permission management tabs"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
        className="mb-6"
        variant="underlined"
        color="primary"
      >
        <Tab
          key="overview"
          title={
            <div className="flex items-center gap-2">
              <CogIcon className="h-4 w-4" />
              Visão Geral
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {overviewCards.map((card, index) => (
              <Card key={index} className="p-4">
                <CardBody className="flex flex-row items-center gap-4">
                  <div className={`p-3 rounded-full bg-${card.color}/10`}>
                    <card.icon className={`h-6 w-6 text-${card.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </div>
                  {card.link && (
                    <Button
                      as={RouteLink}
                      to={card.link}
                      variant="flat"
                      size="sm"
                      color={card.color}
                    >
                      Ver Detalhes
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Roles mais usados */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Roles do Sistema</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="space-y-3">
                  {roles?.slice(0, 5).map((role) => (
                    <div key={role.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{role.name}</p>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      <Button
                        as={RouteLink}
                        to={`/admin/role-permissions/${role.id}`}
                        variant="flat"
                        size="sm"
                      >
                        Gerenciar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>            {/* Permissões por categoria */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Permissões por Categoria</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="space-y-3">
                  {Object.entries(
                    permissions?.reduce((acc, permission) => {
                      // Função para extrair a categoria do nome da permissão
                      const extractCategory = (permissionName: string): string => {
                        // Se contém ':', usa a parte antes dos dois pontos
                        if (permissionName.includes(':')) {
                          return permissionName.split(':')[0];
                        }
                        
                        // Se não contém ':', procura pelos padrões _action no final
                        const actions = ['_create', '_read', '_update', '_delete', '_list'];
                        
                        for (const action of actions) {
                          if (permissionName.endsWith(action)) {
                            const categoryPart = permissionName.slice(0, -action.length);
                            // Substitui underscores por espaços e capitaliza cada palavra
                            return categoryPart
                              .split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ');
                          }
                        }
                        
                        // Se não seguir nenhum padrão conhecido, retorna 'Outros'
                        return 'Outros';
                      };

                      const category = extractCategory(permission.name);
                      acc[category] = (acc[category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>) || {}
                  ).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="font-medium">{category}</span>
                      <Chip size="sm" variant="flat" color="primary">
                        {count}
                      </Chip>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab
          key="roles"
          title={
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-4 w-4" />
              Gerenciar Roles
            </div>
          }
        >
          <RoleManagement />
        </Tab>

        <Tab
          key="permissions"
          title={
            <div className="flex items-center gap-2">
              <KeyIcon className="h-4 w-4" />
              Gerenciar Permissões
            </div>
          }
        >
          <PermissionManagement />
        </Tab>

        <Tab
          key="assignments"
          title={
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4" />
              Atribuir Roles
            </div>
          }
        >
          <UserRoleAssignment />
        </Tab>
      </Tabs>
    </div>
  );
}
