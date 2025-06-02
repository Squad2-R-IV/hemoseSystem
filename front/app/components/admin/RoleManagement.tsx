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
  Input,
  Textarea,
  useDisclosure,
  Chip,
  Tooltip,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "~/services/api";
import type { CreateRoleDto } from "~/Dtos/Role/CreateRoleDto";
import type { ReadRoleDto } from "~/Dtos/Role/ReadRoleDto";
import type { UpdateRoleDto } from "~/Dtos/Role/UpdateRoleDto";
import { Link as RouteLink, useNavigate } from "react-router";
import { ArrowLeftIcon, EyeIcon } from "@phosphor-icons/react";


interface RoleFormData {
  name: string;
  description: string;
}

const initialFormData: RoleFormData = {
  name: "",
  description: "",
};

export default function RoleManagement() {
  const [formData, setFormData] = useState<RoleFormData>(initialFormData);
  const [editingRole, setEditingRole] = useState<ReadRoleDto | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [roleToDelete, setRoleToDelete] = useState<ReadRoleDto | null>(null);

  const { data: roles, isLoading, error, refetch } = useGetRolesQuery({});
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (editingRole) {
        const updateData: UpdateRoleDto = {
          name: formData.name,
          description: formData.description,
        };
        await updateRole({ id: editingRole.id, body: updateData }).unwrap();
      } else {
        const createData: CreateRoleDto = {
          name: formData.name,
          description: formData.description,
        };
        await createRole(createData).unwrap();
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error("Erro ao salvar role:", error);
    }
  };

  const handleDelete = async () => {
    if (roleToDelete) {
      try {
        await deleteRole(roleToDelete.id).unwrap();
        setRoleToDelete(null);
        onDeleteClose();
        refetch();
      } catch (error) {
        console.error("Erro ao deletar role:", error);
      }
    }
  };

  const handleEdit = (role: ReadRoleDto) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description || "",
    });
    onOpen();
  };

  const handleCreate = () => {
    setEditingRole(null);
    setFormData(initialFormData);
    onOpen();
  };

  const handleClose = () => {
    setEditingRole(null);
    setFormData(initialFormData);
    onClose();
  };

  const handleDeleteClick = (role: ReadRoleDto) => {
    setRoleToDelete(role);
    onDeleteOpen();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <p className="text-danger">Erro ao carregar roles</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
      
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Gerenciamento de Roles</h2>
          </div>
          <Button
            color="primary"
            startContent={<PlusIcon className="h-4 w-4" />}
            onPress={handleCreate}
          >
            Criar Role
          </Button>
        </CardHeader>
        <CardBody>
          <Table aria-label="Tabela de roles">
            <TableHeader>
              <TableColumn>NOME</TableColumn>
              <TableColumn>DESCRIÇÃO</TableColumn>
              <TableColumn>CRIADO EM</TableColumn>
              <TableColumn>AÇÕES</TableColumn>
            </TableHeader>
            <TableBody>
              {(roles || []).map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        {role.name}
                      </Chip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-default-600">
                      {role.description || "Sem descrição"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-default-600">
                      -
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Visualizar permissões" color="primary">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="primary"
                          as={RouteLink}
                          to={`/admin/role-permissions/${role.id}`}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Editar role">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onPress={() => handleEdit(role)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Deletar role" color="danger">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="danger"
                          onPress={() => handleDeleteClick(role)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal de Criação/Edição */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {editingRole ? "Editar Role" : "Criar Nova Role"}
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Nome"
              placeholder="Digite o nome da role"
              variant="bordered"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Textarea
              label="Descrição"
              placeholder="Digite a descrição da role"
              variant="bordered"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleClose}>
              Cancelar
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isCreating || isUpdating}
            >
              {editingRole ? "Atualizar" : "Criar"}
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
            Confirmar Exclusão
          </ModalHeader>
          <ModalBody>
            <p>
              Tem certeza que deseja deletar a role{" "}
              <strong>{roleToDelete?.name}</strong>?
            </p>
            <p className="text-sm text-danger">
              Esta ação não pode ser desfeita.
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
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
