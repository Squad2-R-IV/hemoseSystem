import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import logoDark from "@/assets/images/logo.svg";

export function Cadastro() {
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

          <form className="space-y-6">
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
                type="password"
                isClearable
                variant="bordered"
                placeholder="Confirme sua senha"
                className="w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#2196F3] hover:bg-[#1976D2] rounded-lg"
            >
              Criar Conta
            </Button>
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
