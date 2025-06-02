import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Spinner,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
} from "@heroui/react";
import {
  PlusIcon,
  TrashIcon,
  CogIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import {
  useGetRoleToPermissionsQuery,
  useCreateRoleToPermissionMutation,
  useDeleteRoleToPermissionMutation,
  useGetRolesQuery,
  useGetPermissionsQuery,
} from "~/services/api";
import type { ReadPermissionDto } from "~/Dtos/Permission/ReadPermissionDto";
import type { ReadRoleDto } from "~/Dtos/Role/ReadRoleDto";
import type { CreateRoleToPermissionDto } from "~/Dtos/RoleToPermission/CreateRoleToPermissionDto";
import type { ReadRoleToPermissionDto } from "~/Dtos/RoleToPermission/ReadRoleToPermissionDto";


interface AssignmentFormData {
  roleId: string | null;
  permissionIds: string[];
}

const initialFormData: AssignmentFormData = {
  roleId: null,
  permissionIds: [],
};

export default function RolePermissionAssignment() {
  const [formData, setFormData] = useState<AssignmentFormData>(initialFormData);
  const [selectedRole, setSelectedRole] = useState<ReadRoleDto | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [assignmentToDelete, setAssignmentToDelete] = useState<ReadRoleToPermissionDto | null>(null);

  const { data: rolePermissions, isLoading: rolePermissionsLoading, refetch } = useGetRoleToPermissionsQuery({ includeRelations: true });
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery({});
  const { data: permissions, isLoading: permissionsLoading } = useGetPermissionsQuery({});
  
  const [createRoleToPermission, { isLoading: isCreating }] = useCreateRoleToPermissionMutation();
  const [deleteRoleToPermission, { isLoading: isDeleting }] = useDeleteRoleToPermissionMutation();

  const isLoading = rolePermissionsLoading || rolesLoading || permissionsLoading;

  const handleSubmit = async () => {
    try {
      if (formData.roleId && formData.permissionIds.length > 0) {
        // Create multiple role-permission assignments
        for (const permissionId of formData.permissionIds) {
          const createData: CreateRoleToPermissionDto = {
            roleId: formData.roleId,
            permissionId: permissionId,
          };
          await createRoleToPermission(createData).unwrap();
        }
        handleClose();
        refetch();
      }
    } catch (error) {
      console.error("Erro ao atribuir permissões:", error);
    }
  };

  const handleDelete = async () => {
    if (assignmentToDelete) {
      try {
        await deleteRoleToPermission({ roleId: assignmentToDelete.roleId, permissionId: assignmentToDelete.permissionId }).unwrap();
        setAssignmentToDelete(null);
        onDeleteClose();
        refetch();
      } catch (error) {
        console.error("Erro ao remover permissão:", error);
      }
    }
  };

  const handleCreate = () => {
    setFormData(initialFormData);
    onOpen();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setSelectedRole(null);
    onClose();
  };

  const handleDeleteClick = (assignment: ReadRoleToPermissionDto) => {
    setAssignmentToDelete(assignment);
    onDeleteOpen();
  };
  const handleRoleSelect = (roleId: string) => {
    setFormData({ ...formData, roleId: roleId });
    
    const role = roles?.find(r => r.id === roleId);
    setSelectedRole(role || null);

    // Get already assigned permissions for this role
    const assignedPermissionIds = rolePermissions
      ?.filter(rp => rp.role?.id === roleId)
      .map(rp => rp.permission?.id) || [];
    
    setFormData(prev => ({ ...prev, permissionIds: [] }));
  };
  // Group role-permissions by role
  const roleAssignments = rolePermissions?.reduce((acc, assignment) => {
    if (!assignment.role) return acc;
    const roleId = assignment.role.id;
    if (!acc[roleId]) {
      acc[roleId] = {
        role: assignment.role,
        permissions: [],
      };
    }
    acc[roleId].permissions.push({
      assignment,
      permission: assignment.permission!,
    });
    return acc;
  }, {} as Record<string, { role: ReadRoleDto; permissions: { assignment: ReadRoleToPermissionDto; permission: ReadPermissionDto }[] }>) || {};

  // Filter roles based on search term
  const filteredRoleAssignments = Object.entries(roleAssignments).filter(([_, data]) =>
    data.role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Get already assigned permission IDs for selected role
  const assignedPermissionIds = selectedRole 
    ? rolePermissions?.filter(rp => rp.role?.id === selectedRole.id).map(rp => rp.permission?.id).filter(Boolean) || []
    : [];

  // Filter available permissions (not yet assigned to selected role)
  const availablePermissions = permissions?.filter(permission => 
    !assignedPermissionIds.includes(permission.id)
  ) || [];
  // Função para extrair categoria das permissões
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

  // Group permissions by category
  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    const category = extractCategory(permission.name);
    if (!acc[category]) acc[category] = [];
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, ReadPermissionDto[]>);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CogIcon className="h-6 w-6 text-warning" />
            <h2 className="text-xl font-semibold">Atribuição de Permissões a Roles</h2>
          </div>
          <Button
            color="warning"
            startContent={<PlusIcon className="h-4 w-4" />}
            onPress={handleCreate}
          >
            Atribuir Permissões
          </Button>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <Input
              label="Buscar role"
              placeholder="Digite o nome da role"
              startContent={<MagnifyingGlassIcon className="h-4 w-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            {filteredRoleAssignments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-default-500">Nenhuma role encontrada com permissões atribuídas</p>
              </div>
            ) : (
              filteredRoleAssignments.map(([roleId, data]) => (
                <Card key={roleId} className="border border-default-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold text-lg">{data.role.name}</h3>
                        <p className="text-sm text-default-600">{data.role.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="space-y-4">
                      {Object.entries(
                        data.permissions.reduce((acc, { permission }) => {
                          const category = permission.name.split(':')[0] || 'other';
                          if (!acc[category]) acc[category] = [];
                          acc[category].push(permission);
                          return acc;
                        }, {} as Record<string, ReadPermissionDto[]>)
                      ).map(([category, categoryPermissions]) => (
                        <div key={category}>
                          <h4 className="font-medium text-sm text-default-700 mb-2 capitalize">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {categoryPermissions.map((permission) => {
                              const assignment = data.permissions.find(p => p.permission.id === permission.id)?.assignment;
                              return (
                                <Chip
                                  key={permission.id}
                                  size="sm"
                                  variant="flat"
                                  color="primary"
                                  endContent={
                                    <button
                                      className="ml-1 text-danger hover:text-danger-600"
                                      onClick={() => assignment && handleDeleteClick(assignment)}
                                    >
                                      <TrashIcon className="h-3 w-3" />
                                    </button>
                                  }
                                >
                                  {permission.name}
                                </Chip>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        </CardBody>
      </Card>

      {/* Modal de Atribuição */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        placement="top-center"
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Atribuir Permissões a Role
          </ModalHeader>
          <ModalBody>
            <Select
              label="Role"
              placeholder="Selecione uma role"
              selectedKeys={formData.roleId ? [formData.roleId.toString()] : []}
              onSelectionChange={(keys) => {
                const roleId = Array.from(keys)[0] as string;
                if (roleId) handleRoleSelect(roleId);
              }}
            >
              {(roles || []).map((role) => (                <SelectItem key={role.id.toString()}>
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-sm text-default-500">{role.description}</p>
                  </div>
                </SelectItem>
              ))}
            </Select>

            {selectedRole && (
              <div className="space-y-4">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheckIcon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Role Selecionada: {selectedRole.name}</span>
                  </div>
                  <p className="text-sm text-default-600">{selectedRole.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Permissões Disponíveis</h4>
                  <CheckboxGroup
                    value={formData.permissionIds.map(id => id.toString())}                    onValueChange={(values) => {
                      setFormData({
                        ...formData,
                        permissionIds: values
                      });
                    }}
                  >
                    <div className="space-y-4">
                      {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                        <div key={category}>
                          <div className="flex items-center gap-2 mb-2">
                            <KeyIcon className="h-4 w-4 text-secondary" />
                            <span className="font-medium text-sm capitalize">{category}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 ml-6">
                            {categoryPermissions.map((permission) => (
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
                        </div>
                      ))}
                    </div>
                  </CheckboxGroup>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleClose}>
              Cancelar
            </Button>
            <Button
              color="warning"
              onPress={handleSubmit}
              isLoading={isCreating}
              isDisabled={!formData.roleId || formData.permissionIds.length === 0}
            >
              Atribuir Permissões ({formData.permissionIds.length})
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirmar Remoção
          </ModalHeader>
          <ModalBody>            <p>
              Tem certeza que deseja remover a permissão{" "}
              <strong>{assignmentToDelete?.permission?.name}</strong> da role{" "}
              <strong>{assignmentToDelete?.role?.name}</strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onPress={onDeleteClose}>
              Cancelar
            </Button>
            <Button
              color="danger"
              onPress={handleDelete}
              isLoading={isDeleting}
            >
              Remover
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
