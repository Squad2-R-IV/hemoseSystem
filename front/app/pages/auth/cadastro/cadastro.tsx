import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Checkbox } from "@heroui/checkbox";
import { CircularProgress } from "@heroui/progress";
import { addToast } from "@heroui/react";
import { useCreateUserMutation } from "~/services/siahme-api.service";
import logoDark from "@/assets/images/logo.svg";
import { CreateUserDto } from "~/Dtos/User/CreateUser.dto";

export function Cadastro() {
  const [isHealthProfessional, setIsHealthProfessional] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();

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
      conselho: formData.get("conselho") as string || undefined,
      registro: formData.get("registro") as string || undefined,
    };

    try {
      const response = await createUser(data).unwrap();

      addToast({
        title: "Sucesso",
        description: "Conta criada com sucesso",
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Erro",
        description: "Erro ao criar conta",
        color: "danger",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F4F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logoDark}
            alt="FSPH Logo"
            width={180}
            height={80}
            className="mb-4"
          />
          <h2 className="text-[#768caa] text-lg">
            Design do Painel de Administração
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-center text-[#4f4f5f] mb-8">
            Crie sua conta
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome
              </label>
              <Input
                id="name"
                name="name"
                isClearable
                placeholder="Digite seu nome"
                type="text"
                variant="bordered"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                isClearable
                placeholder="Digite seu email"
                type="email"
                variant="bordered"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                isClearable
                variant="bordered"
                placeholder="Digite sua senha"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar Senha
              </label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                isClearable
                variant="bordered"
                placeholder="Confirme sua senha"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CPF
              </label>
              <Input
                id="cpf"
                name="cpf"
                isClearable
                placeholder="Digite seu CPF"
                type="text"
                variant="bordered"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="contato"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contato
              </label>
              <Input
                id="contato"
                name="contato"
                isClearable
                placeholder="Digite seu contato"
                type="text"
                variant="bordered"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="flex items-center">
              <Checkbox
                isSelected={isHealthProfessional}
                onValueChange={setIsHealthProfessional}
                radius="md"
                color="primary"
                className="text-gray-600 rounded-r-full"
              >
                Profissional da Saúde?
              </Checkbox>
            </div>

            {isHealthProfessional && (
              <>
                <div>
                  <label
                    htmlFor="especialidade"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Especialidade
                  </label>
                  <Input
                    id="especialidade"
                    name="especialidade"
                    isClearable
                    placeholder="Digite sua especialidade"
                    type="text"
                    variant="bordered"
                    className="w-full text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="conselho"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Conselho
                  </label>
                  <Input
                    id="conselho"
                    name="conselho"
                    isClearable
                    placeholder="Digite seu conselho"
                    type="text"
                    variant="bordered"
                    className="w-full text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="registro"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Registro
                  </label>
                  <Input
                    id="registro"
                    name="registro"
                    isClearable
                    placeholder="Digite seu registro"
                    type="text"
                    variant="bordered"
                    className="w-full text-gray-800 placeholder-gray-500"
                  />
                </div>
              </>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center">
                <CircularProgress label="Carregando..." />
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#2196F3] hover:bg-[#1976D2] rounded-lg"
              >
                Criar Conta
              </Button>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Já tem uma conta?</span>{" "}
            <Link href="/login" className="text-[#2196F3] hover:text-[#1976D2]">
              Entrar
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          2025 © Fundação de Saúde Parreiras Horta
        </div>
      </div>
    </div>
  );
}
