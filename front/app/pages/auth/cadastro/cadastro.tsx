import React from "react";
import type { Selection } from "@react-types/shared";
import { 
  Button, 
  Input, 
  Link, 
  Checkbox, 
  CircularProgress,
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
  addToast
} from "@heroui/react";
import { useCreateUserMutation } from "~/services/siahme-api.service";
import { CreateUserDto } from "~/Dtos/User/CreateUser.dto";

const roles = [
  { name: "gestor", description: "Gestor" },
  { name: "recepcionista", description: "Recepcionista" },
  { name: "medico", description: "Médico" },
  { name: "fisioterapeuta", description: "Fisioterapeuta" },
  { name: "enfermeiro", description: "Enfermeiro" },
  { name: "admin", description: "Administrador" },
  { name: "nutricionista", description: "Nutricionista" },
];

const healthRoles = ["medico", "fisioterapeuta", "enfermeiro", "nutricionista", "dentista"];

const councilMap: Record<string, string> = {
  medico: "CRM",
  fisioterapeuta: "CREFITO",
  dentista: "CRO",
  enfermeiro: "COREN",
  nutricionista: "CRN",
};

export function Cadastro() {
  // Remova o useState do isHealthProfessional
  const [selectedRole, setSelectedRole] = React.useState<Selection>(new Set([]));
  const [council, setCouncil] = React.useState("");
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleRoleChange = (keys: Selection) => {
    if (keys === "all" || !(keys instanceof Set)) {
      return;
    }

    setSelectedRole(keys);
    const roleKey = Array.from(keys)[0];
    setCouncil(councilMap[roleKey] || "");
  };

  const selectedRoleKey = selectedRole && selectedRole !== 'all' ? Array.from(selectedRole as Set<string>)[0] : '';
  const isHealthProfessional = healthRoles.includes(selectedRoleKey);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: CreateUserDto = {
      name: formData.get("name") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      cpf: formData.get("cpf") as string,
      contato: formData.get("contato") as string,
      especialidade: formData.get("especialidade") as string || undefined,
      conselho: council || undefined,
      registro: formData.get("registro") as string || undefined,
      roles: selectedRole && selectedRole !== 'all' ? Array.from(selectedRole as Set<string>) : undefined,
    };

    try {
      await createUser(data).unwrap();
      addToast({
        title: "Sucesso",
        description: "Conta criada com sucesso",
        color: "success",
      });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };
return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-content2 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="p-6">
          <CardHeader>
            <h1 className="text-2xl font-semibold text-center">
              Crie sua conta
            </h1>
          </CardHeader>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input name="name" label="Nome" placeholder="Digite seu nome" variant="bordered" isClearable />
              <Input name="email" label="Email" placeholder="Digite seu email" type="email" variant="bordered" isClearable />
              <Input name="password" label="Senha" placeholder="Digite sua senha" type="password" variant="bordered" isClearable />
              <Input name="confirm-password" label="Confirmar Senha" placeholder="Confirme sua senha" type="password" variant="bordered" isClearable />
              <Input name="cpf" label="CPF" placeholder="Digite seu CPF" variant="bordered" isClearable />
              <Input name="contato" label="Contato" placeholder="Digite seu contato" variant="bordered" isClearable />

              <Select
                label="Função"
                placeholder="Selecione sua função"
                selectedKeys={selectedRole}
                onSelectionChange={handleRoleChange}
                selectionMode="single"
                className="w-full"
              >
                {roles.map((role) => (
                  <SelectItem key={role.name}>
                    {role.description}
                  </SelectItem>
                ))}
              </Select>

              {isHealthProfessional && (
                <>
                  <Input
                    name="especialidade"
                    label="Especialidade"
                    placeholder="Digite sua especialidade"
                    variant="bordered"
                    isClearable
                  />
                  <Input
                    name="conselho"
                    label="Conselho"
                    value={council}
                    isReadOnly
                    variant="bordered"
                  />
                  <Input
                    name="registro"
                    label="Registro"
                    placeholder="Digite seu registro"
                    variant="bordered"
                    isClearable
                  />
                </>
              )}

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
                spinner={<CircularProgress size="sm" aria-label="Loading..." />}
              >
                Criar Conta
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="mt-8 text-center text-sm text-default-500">
          2025 © Fundação de Saúde Parreiras Horta
        </div>
      </div>
    </div>
  );
}