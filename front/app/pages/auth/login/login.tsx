import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Checkbox } from "@heroui/checkbox";
import { CircularProgress } from "@heroui/progress";
import logoDark from "@/assets/images/logo.svg";
import { addToast } from "@heroui/react";
import { useLoginMutation } from "~/services/siahme-api.service";

export function Login() {
  const [isSelected, setIsSelected] = React.useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      const response = await login({ email, password }).unwrap();

      if (response.message) {
        addToast({
          title: "Erro",
          description: response.message,
          color: "danger",
        });
        return;
      }

      if (response.token) {
        addToast({
          title: "Sucesso",
          description: "Login realizado com sucesso",
          color: "success",
        });
      }
    } catch (error) {
      console.error("Error:", error);
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
            Faça login na sua conta
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                isClearable
                defaultValue="junior@heroui.com"
                placeholder="Digite seu email"
                type="email"
                variant="bordered"
                className="w-full text-gray-800 placeholder-gray-500"
                // eslint-disable-next-line no-console
                onClear={() => console.log("input cleared")}
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
                type="password"
                isClearable
                variant="bordered"
                placeholder="Digite sua senha"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                  radius="md"
                  color="primary"
                  className="text-gray-600 rounded-r-full "
                >
                  Lembrar de mim
                </Checkbox>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center">
                <CircularProgress label="Carregando..." />
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#2196F3] hover:bg-[#1976D2] rounded-lg"
              >
                Entrar
              </Button>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Não tem uma conta?</span>{" "}
            <Link
              href="/cadastro"
              className="text-[#2196F3] hover:text-[#1976D2]"
            >
              Cadastrar-se!
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
