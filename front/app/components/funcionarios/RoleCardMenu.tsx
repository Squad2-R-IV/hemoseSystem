import React from 'react';
import RoleCard from './RoleCard';

// Importando as imagens dos diferentes tipos de funcionários
import medicoImg from '../../assets/images/roles/medico.svg';
import enfermeiraImg from '../../assets/images/roles/enfermeira.svg';
import recepcionistaImg from '../../assets/images/roles/recepcionista.svg';
import gestaoImg from '../../assets/images/roles/gestao.svg';
import dentistaImg from '../../assets/images/roles/medico.svg'; // Reutilizando imagem de médico para dentista
import fisioterapeutaImg from '../../assets/images/roles/enfermeira.svg'; // Reutilizando imagem de enfermeira para fisioterapeuta

const RoleCardMenu: React.FC = () => {
  const roles = [
    {
      title: 'Médicos',
      imageSrc: medicoImg,
      role: 'medico'
    },
    {
      title: 'Enfermeiros',
      imageSrc: enfermeiraImg,
      role: 'enfermeiro'
    },
    {
      title: 'Recepcionistas',
      imageSrc: recepcionistaImg,
      role: 'recepcionista'
    },
    {
      title: 'Dentistas',
      imageSrc: dentistaImg,
      role: 'dentista'
    },
    {
      title: 'Fisioterapeutas',
      imageSrc: fisioterapeutaImg,
      role: 'fisioterapeuta'
    },
    {
      title: 'Equipe de Gestão',
      imageSrc: gestaoImg,
      role: 'gestor'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {roles.map((role, index) => (
        <RoleCard
          key={index}
          title={role.title}
          imageSrc={role.imageSrc}
          role={role.role}
        />
      ))}
    </div>
  );
};

export default RoleCardMenu;