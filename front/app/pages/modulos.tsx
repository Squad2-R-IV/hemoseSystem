import React from "react";
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
  BeakerIcon,
  ShoppingCartIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"; //icones da Heroui
import logoDark from "@/assets/images/logo-dark.png";

export function Modulos() {
  // Função de logout
  const handleCardClick = (modulo: string) => {
    alert(`Você clicou no módulo: ${modulo}`);
    // teste inicial 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F4F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        {/* Logo e Título */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-black text-3xl font-bold mt-4"> 
            Bem-vindo ao SPE HEMOSE
          </h1>
          <p className="text-gray-700 text-base"> 
            Selecione um módulo para começar
          </p>
        </div>

        {/* Grid de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Recepção */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-50 hover:scale-105"
            onClick={() => handleCardClick("recepcao")} // Vai para a página de Recepção
          >
            <div className="flex items-center mb-4">
              <UserGroupIcon className="h-8 w-8 text-[#2196F3] mr-3 " />
              <h3 className="text-xl font-semibold text-[#4f4f5f]">Recepção</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Cadastro e gerenciamento de pacientes, agendamentos e admissões.
            </p>
          </div>

          {/* Card: Atendimento Médico */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-50 hover:scale-105"
            onClick={() => handleCardClick("Atendimento Médico")}
          >
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-8 w-8 text-[#4CAF50] mr-3" />
              <h3 className="text-xl font-semibold text-[#4f4f5f]">
                Atendimento Médico
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Prontuário eletrônico, evolução médica e prescrições.
            </p>
          </div>

          {/* Card: Gestão e Administração */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-50 hover:scale-105"
            onClick={() => handleCardClick("Gestão e Administração")}
          >
            <div className="flex items-center mb-4">
              <CogIcon className="h-8 w-8 text-[#9C27B0] mr-3" />
              <h3 className="text-xl font-semibold text-[#4f4f5f]">
                Gestão e Administração
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Controle de usuários, permissões e configurações do sistema.
            </p>
          </div>

          {/* Card: Laboratório */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-50 hover:scale-105"
            onClick={() => handleCardClick("Laboratório")}
          >
            <div className="flex items-center mb-4">
              <BeakerIcon className="h-8 w-8 text-[#FF9800] mr-3" />
              <h3 className="text-xl font-semibold text-[#4f4f5f]">Laboratório</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Gestão de exames laboratoriais e resultados.
            </p>
          </div>

          {/* Card: Farmácia */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-50 hover:scale-105"
            onClick={() => handleCardClick("Farmácia")}
          >
            <div className="flex items-center mb-4">
              <ShoppingCartIcon className="h-8 w-8 text-[#E91E63] mr-3" />
              <h3 className="text-xl font-semibold text-[#4f4f5f]">Farmácia</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Controle de medicamentos e dispensação.
            </p>
          </div>

          {/* Card: Segurança */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-50 hover:scale-105"
            onClick={() => handleCardClick("Segurança")}
          >
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-[#673AB7] mr-3" />
              <h3 className="text-xl font-semibold text-[#4f4f5f]">Segurança</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Gerenciamento de permissões e auditoria do sistema.
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-8 text-center text-sm text-gray-500">
          2025 © Fundação de Saúde Parreiras Horta
        </div>
      </div>
    </div>
  );
}
