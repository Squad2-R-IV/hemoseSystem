import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Tooltip,
  Spinner,
  Select,
  SelectItem,
  Avatar,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import {
  PlusIcon,
  TrashIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  useGetUserToRolesQuery,
  useCreateUserToRoleMutation,
  useDeleteUserToRoleMutation,
  useGetRolesQuery,
  useGetUsersQuery,
} from "~/services/api";
import type { ReadRoleDto } from "~/Dtos/Role/ReadRoleDto";
import type { ReadUserDto } from "~/Dtos/User/ReadUser.dto";
import type { CreateUserToRoleDto } from "~/Dtos/UserToRole/CreateUserToRoleDto";
import type { ReadUserToRoleDto } from "~/Dtos/UserToRole/ReadUserToRoleDto";


interface AssignmentFormData {
  userId: string | null;
  roleId: string | null;
}

const initialFormData: AssignmentFormData = {
  userId: null,
  roleId: null,
};

export default function UserRoleAssignment() {
  const [formData, setFormData] = useState<AssignmentFormData>(initialFormData);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [assignmentToDelete, setAssignmentToDelete] = useState<ReadUserToRoleDto | null>(null);

  const { data: userRoles, isLoading: userRolesLoading, refetch } = useGetUserToRolesQuery({ includeRelations: true });
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery({});
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  
  const [createUserToRole, { isLoading: isCreating }] = useCreateUserToRoleMutation();
  const [deleteUserToRole, { isLoading: isDeleting }] = useDeleteUserToRoleMutation();

  const isLoading = userRolesLoading || rolesLoading || usersLoading;

  const handleSubmit = async () => {
    try {
      if (formData.userId && formData.roleId) {
        const createData: CreateUserToRoleDto = {
          userId: formData.userId,
          roleId: formData.roleId,
        };
        await createUserToRole(createData).unwrap();
        handleClose();
        refetch();
      }
    } catch (error) {
      console.error("Erro ao atribuir role:", error);
    }
  };

  const handleDelete = async () => {
    if (assignmentToDelete) {
      try {
        await deleteUserToRole({ userId: assignmentToDelete.userId, roleId: assignmentToDelete.roleId }).unwrap();
        setAssignmentToDelete(null);
        onDeleteClose();
        refetch();
      } catch (error) {
        console.error("Erro ao remover atribuição:", error);
      }
    }
  };

  const handleCreate = () => {
    setFormData(initialFormData);
    onOpen();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const handleDeleteClick = (assignment: ReadUserToRoleDto) => {
    setAssignmentToDelete(assignment);
    onDeleteOpen();
  };
  // Group assignments by user
  const userAssignments = userRoles?.reduce((acc, assignment) => {
    if (!assignment.user) return acc;
    const userId = assignment.user.id;
    if (!acc[userId]) {
      acc[userId] = {
        user: assignment.user,
        roles: [],
      };
    }
    acc[userId].roles.push({
      assignment,
      role: assignment.role!,
    });
    return acc;
  }, {} as Record<string, { user: ReadUserDto; roles: { assignment: ReadUserToRoleDto; role: ReadRoleDto }[] }>) || {};

  // Filter users based on search term
  const filteredUserAssignments = Object.entries(userAssignments).filter(([_, data]) =>
    data.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Available users (not yet assigned or can have multiple roles)
  const availableUsers = users?.filter(user => 
    !searchTerm || 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
            <UsersIcon className="h-6 w-6 text-success" />
            <h2 className="text-xl font-semibold">Atribuição de Roles a Usuários</h2>
          </div>
          <Button
            color="success"
            startContent={<PlusIcon className="h-4 w-4" />}
            onPress={handleCreate}
          >
            Atribuir Role
          </Button>
        </CardHeader>
        <CardBody>
          <div className="mb-4">            <Autocomplete
              label="Buscar usuário"
              placeholder="Digite o nome ou email do usuário"
              startContent={<MagnifyingGlassIcon className="h-4 w-4" />}
              onInputChange={setSearchTerm}
            >
              {availableUsers.map((user) => (
                <AutocompleteItem key={user.id}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      name={user.name}
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-default-500">{user.email}</p>
                    </div>
                  </div>
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>

          <div className="space-y-4">
            {filteredUserAssignments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-default-500">Nenhum usuário encontrado com roles atribuídas</p>
              </div>
            ) : (
              filteredUserAssignments.map(([userId, data]) => (
                <Card key={userId} className="border border-default-200">
                  <CardBody>
                    <div className="flex items-start gap-4">                      <Avatar
                        size="md"
                        name={data.user.name}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{data.user.name}</h3>
                        <p className="text-sm text-default-600 mb-3">{data.user.email}</p>
                        <div className="flex flex-wrap gap-2">                          {data.roles.map(({ assignment, role }) => (
                            <div key={`${assignment.userId}-${assignment.roleId}`} className="flex items-center gap-2">
                              <Chip
                                size="sm"
                                variant="flat"
                                color="primary"
                                endContent={
                                  <Tooltip content="Remover role" color="danger">
                                    <button
                                      className="ml-1 text-danger hover:text-danger-600"
                                      onClick={() => handleDeleteClick(assignment)}
                                    >
                                      <TrashIcon className="h-3 w-3" />
                                    </button>
                                  </Tooltip>
                                }
                              >
                                {role.name}
                              </Chip>
                            </div>
                          ))}
                        </div>
                      </div>
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
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Atribuir Role a Usuário
          </ModalHeader>
          <ModalBody>
            <Select
              label="Usuário"
              placeholder="Selecione um usuário"
              selectedKeys={formData.userId ? [formData.userId.toString()] : []}              onSelectionChange={(keys) => {
                const userId = Array.from(keys)[0] as string;
                setFormData({ ...formData, userId: userId || null });
              }}
            >
              {(users || []).map((user) => (                <SelectItem key={user.id.toString()}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      name={user.name}
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-default-500">{user.email}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Role"
              placeholder="Selecione uma role"
              selectedKeys={formData.roleId ? [formData.roleId.toString()] : []}              onSelectionChange={(keys) => {
                const roleId = Array.from(keys)[0] as string;
                setFormData({ ...formData, roleId: roleId || null });
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
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleClose}>
              Cancelar
            </Button>
            <Button
              color="success"
              onPress={handleSubmit}
              isLoading={isCreating}
              isDisabled={!formData.userId || !formData.roleId}
            >
              Atribuir
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
              Tem certeza que deseja remover a role{" "}
              <strong>{assignmentToDelete?.role?.name}</strong> do usuário{" "}
              <strong>{assignmentToDelete?.user?.name}</strong>?
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
