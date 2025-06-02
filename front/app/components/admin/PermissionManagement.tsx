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
    Select,
    SelectItem,
} from "@heroui/react";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import {
    useGetPermissionsQuery,
    useCreatePermissionMutation,
    useUpdatePermissionMutation,
    useDeletePermissionMutation,
} from "~/services/api";
import type { CreatePermissionDto } from "~/Dtos/Permission/CreatePermissionDto";
import type { ReadPermissionDto } from "~/Dtos/Permission/ReadPermissionDto";
import type { UpdatePermissionDto } from "~/Dtos/Permission/UpdatePermissionDto";


interface PermissionFormData {
    name: string;
    description: string;
}

const initialFormData: PermissionFormData = {
    name: "",
    description: "",
};

// Predefined permission categories for better organization
const permissionCategories = [
    { key: "user", label: "Usuários", prefix: "user" },
    { key: "role", label: "Roles", prefix: "role" },
    { key: "permission", label: "Permissões", prefix: "permission" },
    { key: "conduta", label: "Condutas", prefix: "conduta" },
    { key: "agendamento", label: "Agendamentos", prefix: "agendamento" },
    { key: "funcionario", label: "Funcionários", prefix: "funcionario" },
    { key: "admin", label: "Administração", prefix: "admin" },
];

const permissionActions = ["create", "read", "update", "delete", "list"];

export default function PermissionManagement() {
    const [formData, setFormData] = useState<PermissionFormData>(initialFormData);
    const [editingPermission, setEditingPermission] = useState<ReadPermissionDto | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedAction, setSelectedAction] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const [permissionToDelete, setPermissionToDelete] = useState<ReadPermissionDto | null>(null);

    const { data: permissions, isLoading, error, refetch } = useGetPermissionsQuery({});
    const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation();
    const [updatePermission, { isLoading: isUpdating }] = useUpdatePermissionMutation();
    const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

    const handleSubmit = async () => {
        try {
            if (editingPermission) {
                const updateData: UpdatePermissionDto = {
                    name: formData.name,
                    description: formData.description,
                };
                await updatePermission({ id: editingPermission.id, body: updateData }).unwrap();
            } else {
                const createData: CreatePermissionDto = {
                    name: formData.name,
                    description: formData.description,
                };
                await createPermission(createData).unwrap();
            }
            handleClose();
            refetch();
        } catch (error) {
            console.error("Erro ao salvar permissão:", error);
        }
    };

    const handleDelete = async () => {
        if (permissionToDelete) {
            try {
                await deletePermission(permissionToDelete.id).unwrap();
                setPermissionToDelete(null);
                onDeleteClose();
                refetch();
            } catch (error) {
                console.error("Erro ao deletar permissão:", error);
            }
        }
    };

    const handleEdit = (permission: ReadPermissionDto) => {
        setEditingPermission(permission);
        setFormData({
            name: permission.name,
            description: permission.description || "",
        });

        // Parse category and action from permission name
        const parts = permission.name.split(':');
        if (parts.length >= 2) {
            setSelectedCategory(parts[0]);
            setSelectedAction(parts[1]);
        }

        onOpen();
    };

    const handleCreate = () => {
        setEditingPermission(null);
        setFormData(initialFormData);
        setSelectedCategory("");
        setSelectedAction("");
        onOpen();
    };

    const handleClose = () => {
        setEditingPermission(null);
        setFormData(initialFormData);
        setSelectedCategory("");
        setSelectedAction("");
        onClose();
    };

    const handleDeleteClick = (permission: ReadPermissionDto) => {
        setPermissionToDelete(permission);
        onDeleteOpen();
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        updatePermissionName(value, selectedAction);
    };

    const handleActionChange = (value: string) => {
        setSelectedAction(value);
        updatePermissionName(selectedCategory, value);
    };

    const updatePermissionName = (category: string, action: string) => {
        if (category && action) {
            setFormData(prev => ({
                ...prev,
                name: `${category}_${action}`,
            }));
        }
    };    const getPermissionColor = (permissionName: string) => {
        if (permissionName.includes("create")) return "success";
        if (permissionName.includes("read") || permissionName.includes("list")) return "primary";
        if (permissionName.includes("update")) return "warning";
        if (permissionName.includes("delete")) return "danger";
        return "default";
    };

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

    const groupedPermissions = permissions?.reduce((acc, permission) => {
        const category = extractCategory(permission.name);
        if (!acc[category]) acc[category] = [];
        acc[category].push(permission);
        return acc;
    }, {} as Record<string, ReadPermissionDto[]>) || {};

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
                    <p className="text-danger">Erro ao carregar permissões</p>
                </CardBody>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <KeyIcon className="h-6 w-6 text-secondary" />
                        <h2 className="text-xl font-semibold">Gerenciamento de Permissões</h2>
                    </div>
                    <Button
                        color="secondary"
                        startContent={<PlusIcon className="h-4 w-4" />}
                        onPress={handleCreate}
                    >
                        Criar Permissão
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className="space-y-6">
                        {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                            <div key={category}>
                                <h3 className="text-lg font-semibold mb-3 capitalize">
                                    {permissionCategories.find(cat => cat.key === category)?.label || category}
                                </h3>
                                <Table aria-label={`Permissões de ${category}`}>
                                    <TableHeader>
                                        <TableColumn>PERMISSÃO</TableColumn>
                                        <TableColumn>DESCRIÇÃO</TableColumn>
                                        <TableColumn>CRIADO EM</TableColumn>
                                        <TableColumn>AÇÕES</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {categoryPermissions.map((permission) => (
                                            <TableRow key={permission.id}>
                                                <TableCell>
                                                    <Chip
                                                        size="sm"
                                                        variant="flat"
                                                        color={getPermissionColor(permission.name)}
                                                    >
                                                        {permission.name}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-sm text-default-600">
                                                        {permission.description || "Sem descrição"}
                                                    </p>
                                                </TableCell>
                                                <TableCell>                          <p className="text-sm text-default-600">
                                                    -
                                                </p>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip content="Editar permissão">
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                onPress={() => handleEdit(permission)}
                                                            >
                                                                <PencilIcon className="h-4 w-4" />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip content="Deletar permissão" color="danger">
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                color="danger"
                                                                onPress={() => handleDeleteClick(permission)}
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
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* Modal de Criação/Edição */}
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                placement="top-center"
                size="2xl"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {editingPermission ? "Editar Permissão" : "Criar Nova Permissão"}
                    </ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-2 gap-4">
                <Select
                                label="Categoria"
                                placeholder="Selecione a categoria"
                                selectedKeys={selectedCategory ? [selectedCategory] : []}
                                onSelectionChange={(keys) => handleCategoryChange(Array.from(keys)[0] as string)}
                            >
                                {permissionCategories.map((category) => (
                                    <SelectItem key={category.key}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                label="Ação"
                                placeholder="Selecione a ação"
                                selectedKeys={selectedAction ? [selectedAction] : []}
                                onSelectionChange={(keys) => handleActionChange(Array.from(keys)[0] as string)}                            >
                                {permissionActions.map((action) => (
                                    <SelectItem key={action}>
                                        {action}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <Input
                            label="Nome da Permissão"
                            placeholder="categoria_acao"
                            variant="bordered"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            description="Formato: categoria_acao (ex: user_create)"
                        />
                        <Textarea
                            label="Descrição"
                            placeholder="Digite a descrição da permissão"
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
                            color="secondary"
                            onPress={handleSubmit}
                            isLoading={isCreating || isUpdating}
                        >
                            {editingPermission ? "Atualizar" : "Criar"}
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
                            Tem certeza que deseja deletar a permissão{" "}
                            <strong>{permissionToDelete?.name}</strong>?
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
