import React from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Button } from '@heroui/react';
import {
    useGetMedicosQuery,
    useGetEnfermeirosQuery,
    useGetRecepcionistasQuery,
    useGetDentistasQuery,
    useGetFisioterapeutasQuery,
    useGetGestoresQuery
} from '~/services/siahme-api.service';
import UserTable from '~/components/funcionarios/UserTable';
import { ReadUserDto } from '~/Dtos/User/ReadUser.dto';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const FuncionariosRolePage: React.FC = () => {
    const { role } = useParams<{ role: string }>();

    const navigate = useNavigate();

    // Consultas para diferentes tipos de funcionários
    const {
        data: medicos,
        isLoading: isLoadingMedicos,
        refetch: refetchMedicos
    } = useGetMedicosQuery(undefined, { skip: role !== 'medico' });

    const {
        data: enfermeiros,
        isLoading: isLoadingEnfermeiros,
        refetch: refetchEnfermeiros
    } = useGetEnfermeirosQuery(undefined, { skip: role !== 'enfermeiro' });

    const {
        data: recepcionistas,
        isLoading: isLoadingRecepcionistas,
        refetch: refetchRecepcionistas
    } = useGetRecepcionistasQuery(undefined, { skip: role !== 'recepcionista' });

    const {
        data: dentistas,
        isLoading: isLoadingDentistas,
        refetch: refetchDentistas
    } = useGetDentistasQuery(undefined, { skip: role !== 'dentista' });

    const {
        data: gestores,
        isLoading: isLoadingGestores,
        refetch: refetchGestores
    } = useGetGestoresQuery(undefined, { skip: role !== 'gestor' });

    const {
        data: fisioterapeutas,
        isLoading: isLoadingFisioterapeutas,
        refetch: refetchFisioterapeutas
    } = useGetFisioterapeutasQuery(undefined, { skip: role !== 'fisioterapeuta' });

    // Função para atualizar os dados de acordo com o role atual
    const handleUserUpdated = () => {
        switch (role) {
            case 'medico':
                refetchMedicos();
                break;
            case 'enfermeiro':
                refetchEnfermeiros();
                break;
            case 'recepcionista':
                refetchRecepcionistas();
                break;
            case 'dentista':
                refetchDentistas();
                break;
            case 'fisioterapeuta':
                refetchFisioterapeutas();
                break;
            case 'gestor':
                refetchGestores();
                break;
            default:
                break;
        }
    };

    // Determina quais dados mostrar com base no parâmetro de role
    const getRoleData = (): { title: string; users: ReadUserDto[] | undefined; isLoading: boolean } => {
        switch (role) {
            case 'medico':
                return {
                    title: 'Médicos',
                    users: medicos,
                    isLoading: isLoadingMedicos
                };
            case 'enfermeiro':
                return {
                    title: 'Enfermeiros',
                    users: enfermeiros,
                    isLoading: isLoadingEnfermeiros
                };
            case 'recepcionista':
                return {
                    title: 'Recepcionistas',
                    users: recepcionistas,
                    isLoading: isLoadingRecepcionistas
                };
            case 'dentista':
                return {
                    title: 'Dentistas',
                    users: dentistas,
                    isLoading: isLoadingDentistas
                };
            case 'fisioterapeuta':
                return {
                    title: 'Fisioterapeutas',
                    users: fisioterapeutas,
                    isLoading: isLoadingFisioterapeutas
                };
            case 'gestor':
                // Para a categoria "gestão", podemos usar uma abordagem diferente ou mostrar todos os usuários
                return {
                    title: 'Equipe de Gestão',
                    users: gestores, // Aqui você pode definir a lógica para obter gestores
                    isLoading: isLoadingGestores
                };
            default:
                return {
                    title: 'Funcionários',
                    users: [],
                    isLoading: false
                };
        }
    };

    const { title, users, isLoading } = getRoleData();

    return (
        <div className="container mx-auto px-4 py-8">


            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">

                    <Button color="primary" size="sm" className="mr-2"
                        onPress={() => navigate(-1)}>
                        <ChevronLeftIcon className="h-5 w-5" />
                        Voltar
                    </Button>

                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
                <UserTable
                    users={users || []}
                    isLoading={isLoading}
                    onUserUpdated={handleUserUpdated}
                />
            </div>
        </div>
    );
};

export default FuncionariosRolePage;