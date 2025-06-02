import React, { useState } from "react";
import { useParams } from "react-router";
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
  Select,
  SelectItem,
  Avatar,
} from "@heroui/react";
import {
  UsersIcon,
  ShieldCheckIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Link as RouteLink } from "react-router";
import {
  useGetUserToRolesQuery,
  useGetUserByIdQuery,
  useGetRolesQuery,
  useCreateUserToRoleMutation,
  useDeleteUserToRoleMutation,
} from "~/services/api";
import type { CreateUserToRoleDto } from "~/Dtos/UserToRole/CreateUserToRoleDto";
import type { ReadUserToRoleDto } from "~/Dtos/UserToRole/ReadUserToRoleDto";

export default function UserRolesPage() {
  const { userId } = useParams<{ userId: string }>();
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [roleToDelete, setRoleToDelete] = useState<ReadUserToRoleDto | null>(null);

  const { data: user, isLoading: userLoading } = useGetUserByIdQuery(userId!);
  const { data: userRoles, isLoading: userRolesLoading, refetch } = useGetUserToRolesQuery({});
  const { data: allRoles, isLoading: rolesLoading } = useGetRolesQuery({});
  
  const [createUserToRole, { isLoading: isCreating }] = useCreateUserToRoleMutation();
  const [deleteUserToRole, { isLoading: isDeleting }] = useDeleteUserToRoleMutation();

  const isLoading = userLoading || userRolesLoading || rolesLoading;
  // Get current user's roles
  const currentUserRoles = userRoles?.filter(ur => ur.user?.id === userId) || [];
  
  // Get available roles (not yet assigned to this user)
  const assignedRoleIds = currentUserRoles.map(ur => ur.role?.id).filter(Boolean);
  const availableRoles = allRoles?.filter(role => 
    !assignedRoleIds.includes(role.id)
  ) || [];
  const handleAddRole = async () => {
    try {
      if (selectedRoleId) {
        const createData: CreateUserToRoleDto = {
          userId: userId!,
          roleId: selectedRoleId,
        };
        await createUserToRole(createData).unwrap();
        setSelectedRoleId("");
        onClose();
        refetch();
      }
    } catch (error) {
      console.error("Erro ao adicionar role:", error);
    }
  };
  const handleRemoveRole = async () => {
    try {
      if (roleToDelete) {
        await deleteUserToRole({ 
          userId: userId!, 
          roleId: roleToDelete.role?.id || '' 
        }).unwrap();
        setRoleToDelete(null);
        onDeleteClose();
        refetch();
      }
    } catch (error) {
      console.error("Erro ao remover role:", error);
    }
  };

  const handleDeleteClick = (userRole: ReadUserToRoleDto) => {
    setRoleToDelete(userRole);
    onDeleteOpen();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Card>
          <CardBody>
            <p className="text-danger">Usuário não encontrado</p>
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
          as={RouteLink}
          to="/admin/permissions"
          isIconOnly
          variant="flat"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <UsersIcon className="h-8 w-8 text-success" />        <div className="flex items-center gap-4">
          <Avatar
            size="lg"
            name={user.name}
          />
          <div>
            <h1 className="text-3xl font-bold">Roles do Usuário: {user.name}</h1>
            <p className="text-default-600">{user.email}</p>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Informações do Usuário</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-default-600">Nome</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-default-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>            <div>
              <p className="text-sm text-default-600">Criado em</p>
              <p className="font-medium">-</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Roles Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Roles */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Roles Atuais</h2>
            </div>
            <Chip color="primary" variant="flat">
              {currentUserRoles.length} roles
            </Chip>
          </CardHeader>
          <CardBody>
            {currentUserRoles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-default-500">Nenhuma role atribuída</p>
              </div>
            ) : (              <div className="space-y-3">
                {currentUserRoles.map((userRole, index) => (
                  <div key={`${userRole.userId}-${userRole.roleId}-${index}`} className="flex items-center justify-between p-3 bg-default-50 rounded-lg">
                    <div>
                      <p className="font-medium">{userRole.role?.name}</p>
                      <p className="text-sm text-default-600">{userRole.role?.description}</p>
                    </div>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      isIconOnly
                      onPress={() => handleDeleteClick(userRole)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Add Role */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PlusIcon className="h-6 w-6 text-success" />
              <h2 className="text-xl font-semibold">Adicionar Role</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-center py-8">
              <Button
                color="success"
                startContent={<PlusIcon className="h-4 w-4" />}
                onPress={onOpen}
                isDisabled={availableRoles.length === 0}
              >
                {availableRoles.length === 0 
                  ? "Todas as roles já foram atribuídas"
                  : `Adicionar Role (${availableRoles.length} disponíveis)`
                }
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Add Role Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Adicionar Role para {user.name}
          </ModalHeader>
          <ModalBody>
            <Select
              label="Selecione uma Role"
              placeholder="Escolha a role a ser atribuída"
              selectedKeys={selectedRoleId ? [selectedRoleId] : []}
              onSelectionChange={(keys) => setSelectedRoleId(Array.from(keys)[0] as string)}            >
              {availableRoles.map((role) => (
                <SelectItem key={role.id.toString()}>
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-sm text-default-500">{role.description}</p>
                  </div>
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancelar
            </Button>
            <Button
              color="success"
              onPress={handleAddRole}
              isLoading={isCreating}
              isDisabled={!selectedRoleId}
            >
              Adicionar Role
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirmar Remoção
          </ModalHeader>          <ModalBody>
            <p>
              Tem certeza que deseja remover a role{" "}
              <strong>{roleToDelete?.role?.name}</strong> do usuário{" "}
              <strong>{user.name}</strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onPress={onDeleteClose}>
              Cancelar
            </Button>
            <Button
              color="danger"
              onPress={handleRemoveRole}
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
