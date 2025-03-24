import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  CalendarIcon,
  SquaresPlusIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Recepcao() {
  return (

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
              <UserCircleIcon className="h-5 w-5" />
              <span>Novo Paciente</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors">
              <CalendarIcon className="h-5 w-5" />
              <span>Novo Agendamento</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors">
              <UserCircleIcon className="h-5 w-5" />
              <span>Check-in</span>
            </button>
          </div>

          {/* Patients Table */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Pacientes Agendados Hoje</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar paciente..."
                    className="pl-3 pr-10 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <FunnelIcon className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm border-b bg-gray-50">
                    <th className="px-4 py-3 font-medium text-gray-600">
                      Horário
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-600">
                      Paciente
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-600">
                      Especialidade
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-600">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">08:00</td>
                    <td className="px-4 py-3 text-sm">João Silva</td>
                    <td className="px-4 py-3 text-sm">Cardiologia</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-amber-50 text-amber-900 rounded-full text-xs">
                        Aguardando
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <CheckCircleIcon className="h-[18px] w-[18px]" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <ClockIcon className="h-[18px] w-[18px]" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <XMarkIcon className="h-[18px] w-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l p-6 bg-gray-50">
          {/* Queue */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Fila de Atendimento</h2>
            <div className="space-y-2">
              <div className="bg-white rounded-md p-3 border hover:shadow-sm cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">Emergência (2)</span>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Repeat for other queue items */}
              {/* ... (similar structure for other priority levels) */}
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Calendário</h2>
            <div className="bg-white rounded-md border p-3">
              {/* Calendar grid */}
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h2 className="text-lg font-medium mb-4">Estatísticas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-600">Agendados Hoje</div>
              </div>
              <div className="bg-green-50 rounded-md p-4 border border-green-200">
                <div className="text-3xl font-bold text-green-600">28</div>
                <div className="text-sm text-gray-600">Check-ins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
