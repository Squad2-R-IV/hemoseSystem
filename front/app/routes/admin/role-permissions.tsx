import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Divider,
} from "@heroui/react";
import {
  ShieldCheckIcon,
  KeyIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Link as RouteLink } from "react-router";
import {
  useGetRoleToPermissionsQuery,
  useGetRoleByIdQuery,
  useGetPermissionsQuery,
  useCreateRoleToPermissionMutation,
  useDeleteRoleToPermissionMutation,
} from "~/services/api";
import type { ReadPermissionDto } from "~/Dtos/Permission/ReadPermissionDto";
import type { CreateRoleToPermissionDto } from "~/Dtos/RoleToPermission/CreateRoleToPermissionDto";
import type { ReadRoleToPermissionDto } from "~/Dtos/RoleToPermission/ReadRoleToPermissionDto";

export default function RolePermissionsPage() {
  const { roleId } = useParams<{ roleId: string }>();
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: role, isLoading: roleLoading } = useGetRoleByIdQuery({ id: roleId!, includeRelations: true });
  const { data: rolePermissions, isLoading: rolePermissionsLoading, refetch } = useGetRoleToPermissionsQuery({includeRelations :true});
  const { data: allPermissions, isLoading: permissionsLoading } = useGetPermissionsQuery({});
  
  const [createRoleToPermission, { isLoading: isCreating }] = useCreateRoleToPermissionMutation();
  const [deleteRoleToPermission, { isLoading: isDeleting }] = useDeleteRoleToPermissionMutation();

  const isLoading = roleLoading || rolePermissionsLoading || permissionsLoading;
  // Get current role's permissions
  const currentRolePermissions = rolePermissions?.filter(rp => rp.role?.id === roleId) || [];
  
  const navigate = useNavigate();

  // Get available permissions (not yet assigned to this role)
  const assignedPermissionIds = currentRolePermissions.map(rp => rp.permission?.id).filter(Boolean);
  const availablePermissions = allPermissions?.filter(permission => 
    !assignedPermissionIds.includes(permission.id)
  ) || [];  // Função para extrair categoria das permissões
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

  // Group current permissions by category
  const groupedCurrentPermissions = currentRolePermissions.reduce((acc, rp) => {
    const category = extractCategory(rp.permission?.name || '');
    if (!acc[category]) acc[category] = [];
    acc[category].push(rp);
    return acc;
  }, {} as Record<string, ReadRoleToPermissionDto[]>);

  // Group available permissions by category
  const groupedAvailablePermissions = availablePermissions.reduce((acc, permission) => {
    const category = extractCategory(permission.name);
    if (!acc[category]) acc[category] = [];
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, ReadPermissionDto[]>);
  const handleAddPermissions = async () => {
    try {
      for (const permissionId of selectedPermissionIds) {
        const createData: CreateRoleToPermissionDto = {
          roleId: roleId!,
          permissionId: permissionId,
        };
        await createRoleToPermission(createData).unwrap();
      }
      setSelectedPermissionIds([]);
      onClose();
      refetch();
    } catch (error) {
      console.error("Erro ao adicionar permissões:", error);
    }
  };
  const handleRemovePermission = async (rolePermission: ReadRoleToPermissionDto) => {
    try {
      await deleteRoleToPermission({ 
        roleId: roleId!, 
        permissionId: rolePermission.permission?.id || '' 
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Erro ao remover permissão:", error);
    }
  };

  const getPermissionColor = (permissionName: string) => {
    if (permissionName.includes("create")) return "success";
    if (permissionName.includes("read") || permissionName.includes("list")) return "primary";
    if (permissionName.includes("update")) return "warning";
    if (permissionName.includes("delete")) return "danger";
    return "default";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!role) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Card>
          <CardBody>
            <p className="text-danger">Role não encontrada</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onPress= {() => navigate(-1)}
          isIconOnly
          variant="flat"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <ShieldCheckIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Permissões da Role: {role.name}</h1>
          <p className="text-default-600">{role.description}</p>
        </div>
      </div>

      {/* Current Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <KeyIcon className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Permissões Atuais</h2>
            </div>
            <Chip color="primary" variant="flat">
              {currentRolePermissions.length} permissões
            </Chip>
          </CardHeader>
          <CardBody>
            {Object.keys(groupedCurrentPermissions).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-default-500">Nenhuma permissão atribuída</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedCurrentPermissions).map(([category, permissions]) => (
                  <div key={category}>
                    <h3 className="font-medium text-sm text-default-700 mb-2 capitalize">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">                      
                      {permissions.map((rolePermission, index) => (
                        <Chip
                          key={`${rolePermission.roleId}-${rolePermission.permissionId}-${index}`}
                          size="sm"
                          variant="flat"
                          color={getPermissionColor(rolePermission.permission?.name || '')}endContent={
                            <button
                              className="ml-1 text-danger hover:text-danger-600"
                              onClick={() => handleRemovePermission(rolePermission)}
                              disabled={isDeleting}
                            >
                              <TrashIcon className="h-3 w-3" />
                            </button>
                          }
                        >
                          {rolePermission.permission?.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Add Permissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PlusIcon className="h-6 w-6 text-success" />
              <h2 className="text-xl font-semibold">Adicionar Permissões</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-center py-8">
              <Button
                color="success"
                startContent={<PlusIcon className="h-4 w-4" />}
                onPress={onOpen}
                isDisabled={availablePermissions.length === 0}
              >
                {availablePermissions.length === 0 
                  ? "Todas as permissões já foram atribuídas"
                  : `Adicionar Permissões (${availablePermissions.length} disponíveis)`
                }
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Add Permissions Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Adicionar Permissões à Role: {role.name}
          </ModalHeader>
          <ModalBody>
            <CheckboxGroup
              value={selectedPermissionIds}
              onValueChange={setSelectedPermissionIds}
            >
              <div className="space-y-4">
                {Object.entries(groupedAvailablePermissions).map(([category, permissions]) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-2">
                      <KeyIcon className="h-4 w-4 text-secondary" />
                      <span className="font-medium text-sm capitalize">{category}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                      {permissions.map((permission) => (
                        <Checkbox
                          key={permission.id}
                          value={permission.id.toString()}
                          size="sm"
                        >
                          <div>
                            <p className="text-sm font-medium">{permission.name}</p>
                            <p className="text-xs text-default-500">{permission.description}</p>
                          </div>
                        </Checkbox>
                      ))}
                    </div>
                    <Divider className="my-3" />
                  </div>
                ))}
              </div>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancelar
            </Button>
            <Button
              color="success"
              onPress={handleAddPermissions}
              isLoading={isCreating}
              isDisabled={selectedPermissionIds.length === 0}
            >
              Adicionar ({selectedPermissionIds.length}) Permissões
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
