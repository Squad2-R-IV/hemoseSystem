import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import RoleCardMenu from '~/components/funcionarios/RoleCardMenu';

const FuncionariosPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/*space btween h2 and a button*/}
        <div className='flex justify-between items-center mb-6'>
        <h2 className="text-xl font-semibold mb-4">Selecione uma categoria de funcionários</h2>
        <Button color="primary" size="sm" className="mr-2"
            startContent={<PlusIcon className="h-5 w-5 " />}
            onPress={() => navigate('/cadastro')}>
            Adicionar Funcionário
        </Button>
        </div>
        <RoleCardMenu />
      </div>
    </div>
  );
};

export default FuncionariosPage;