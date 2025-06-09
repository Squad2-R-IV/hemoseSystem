import React, { useState } from 'react';
import { ReadUserDto } from '~/Dtos/User/ReadUser.dto';
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    TableColumn,
    Divider,
    Button,
    Tooltip,
    addToast,
} from '@heroui/react';
import { FunnelIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteUserMutation, useUpdateUserMutation } from '~/services/siahme-api.service';
import { DeleteUserModal } from './DeleteUserModal';
import { UpdateUserModal } from './UpdateUserModal';
import { UpdateUserDto } from '~/Dtos/User/UpdateUser.dto';

interface UserTableProps {
    users: ReadUserDto[];
    isLoading: boolean;
    onUserSelected?: (user: ReadUserDto) => void;
    onUserUpdated?: () => void;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    isLoading,
    onUserSelected,
    onUserUpdated
}) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedUser, setSelectedUser] = useState<ReadUserDto | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Mutation hooks
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const filteredUsers = users?.filter(user => {
        if (!searchQuery) return true;

        const name = user.name?.toLowerCase() || '';
        const email = user.email?.toLowerCase() || '';
        const cpf = user.cpf?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();

        return name.includes(query) || email.includes(query) || cpf.includes(query);
    }) || [];

    // Handle opening delete modal
    const handleOpenDeleteModal = (user: ReadUserDto) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    // Handle closing delete modal
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    // Handle opening update modal
    const handleOpenUpdateModal = (user: ReadUserDto) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    // Handle closing update modal
    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedUser(null);
    };

    // Handle delete confirmation
    const handleDeleteConfirm = async (): Promise<boolean | undefined> => {
        if (!selectedUser) return false;
        
        try {
            await deleteUser(selectedUser.id).unwrap();
            
            addToast({
                title: "Sucesso!",
                description: "Funcionário excluído com sucesso.",
                color: "success",
            });
            
            // Refresh data after successful deletion
            if (onUserUpdated) {
                onUserUpdated();
            }
            
            return true;
        } catch (error) {
            addToast({
                title: "Erro",
                description: "Não foi possível excluir o funcionário.",
                color: "danger",
            });
            return false;
        }
    };

    // Handle update submission
    const handleUpdateSubmit = async (data: UpdateUserDto): Promise<boolean | undefined> => {
        if (!selectedUser) return false;
        
        try {
            await updateUser({ id: selectedUser.id, body: data }).unwrap();
            
            addToast({
                title: "Sucesso!",
                description: "Funcionário atualizado com sucesso.",
                color: "success",
            });
            
            // Refresh data after successful update
            if (onUserUpdated) {
                onUserUpdated();
            }
            
            return true;
        } catch (error) {
            addToast({
                title: "Erro",
                description: "Não foi possível atualizar o funcionário.",
                color: "danger",
            });
            return false;
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8">Carregando dados...</div>;
    }

    if (!users || users.length === 0) {
        return (
            <Card>
                <CardHeader className="flex justify-between items-center px-4 py-3">
                    <h2 className="text-lg font-medium">Funcionários</h2>
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Buscar por nome, email ou CPF..."
                            className="w-64"
                            size="sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Tooltip content="Filtrar">
                            <Button isIconOnly variant="light" size="sm">
                                <FunnelIcon className="h-[18px] w-[18px]" />
                            </Button>
                        </Tooltip>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="p-8 text-center">
                        <h3 className="text-lg font-medium">Nenhum usuário encontrado</h3>
                        <p className="text-gray-500 mt-2">Não existem usuários cadastrados nessa categoria.</p>
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between items-center px-4 py-3">
                    <h2 className="text-lg font-medium">Funcionários</h2>
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Buscar por nome, email ou CPF..."
                            className="w-64"
                            size="sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Tooltip content="Filtrar">
                            <Button isIconOnly variant="light" size="sm">
                                <FunnelIcon className="h-[18px] w-[18px]" />
                            </Button>
                        </Tooltip>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Table 
                        aria-label="Lista de Funcionários"
                        removeWrapper
                    >
                        <TableHeader>
                            <TableColumn>Nome</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>CPF</TableColumn>
                            <TableColumn>Contato</TableColumn>
                            <TableColumn>Especialidade</TableColumn>
                            <TableColumn>Registro</TableColumn>
                            <TableColumn>Ações</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.cpf}</TableCell>
                                    <TableCell>{user.contato || '-'}</TableCell>
                                    <TableCell>{user.especialidade || '-'}</TableCell>
                                    <TableCell>
                                        {user.conselho && user.registro
                                            ? `${user.conselho} ${user.registro}`
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Tooltip content="Ver detalhes">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="primary"
                                                    onPress={() => onUserSelected?.(user)}
                                                >
                                                    <EyeIcon className="h-[18px] w-[18px]" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Editar">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="default"
                                                    onPress={() => handleOpenUpdateModal(user)}
                                                >
                                                    <PencilIcon className="h-[18px] w-[18px]" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Excluir" color="danger">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    onPress={() => handleOpenDeleteModal(user)}
                                                >
                                                    <TrashIcon className="h-[18px] w-[18px]" />
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

            {/* Delete Modal */}
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                user={selectedUser}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
            />

            {/* Update Modal */}
            <UpdateUserModal
                isOpen={isUpdateModalOpen}
                onOpenChange={setIsUpdateModalOpen}
                onClose={handleCloseUpdateModal}
                user={selectedUser}
                onSubmit={handleUpdateSubmit}
                isLoading={isUpdating}
            />
        </>
    );
};

export default UserTable;