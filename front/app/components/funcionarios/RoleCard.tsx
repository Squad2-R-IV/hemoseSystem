import React from 'react';
import { Link } from 'react-router';

interface RoleCardProps {
  title: string;
  imageSrc: string;
  role: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, imageSrc, role }) => {
  return (
    <Link
      viewTransition
      to={`/funcionarios/${role}`}
      className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
    >
      <div className="w-32 h-32 overflow-hidden mb-4">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </Link>
  );
};

export default RoleCard;