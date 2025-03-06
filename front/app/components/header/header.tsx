// src/components/Header.tsx
import React from "react";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import logoDark from "@/assets/images/logo-dark.png"; // Ajuste o caminho conforme necessário

export function Header() {

  // Simulando o cargo do usuário (1 = Administrador, 2 = Médico, 3 = Enfermeiro, 4 = Recepcionista)
  const userRole = 1; // Esse valor pode ser alterado dinamicamente pelo código posteriormente

  // Mapeamento dos cargos
  const roles: { [key: number]: string } = {
    1: "Administrador",
    2: "Médico",
    3: "Enfermeiro",
    4: "Recepcionista",
  };

  // Função para lidar com o logout

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logoDark}
            alt="Logo"
            width={120} // Ajuste o tamanho conforme necessário
            height={60} // Ajuste o tamanho conforme necessário
            className="mr-4"
          />
        </div>

        {/* Nome do Usuário, Cargo e Ícone de Logout */}
        <div className="flex items-center space-x-6">
          {/* Nome do Usuário com Ícone */}
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-700" />
            <div className="flex flex-col items-start">
              <span className="text-gray-700 font-medium">Usuário Admin</span>
              <span className="text-gray-500 text-sm">{roles[userRole]}</span>
            </div>
          </div>

          {/* Ícone de Logout com efeito de hover */}
          <button
            className="transition-transform transform hover:scale-110 cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="h-8 w-8 text-red-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
