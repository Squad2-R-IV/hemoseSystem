import React from 'react';
import { Link } from 'react-router';

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  path: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, path }) => {
  return (
    <Link
      viewTransition
      to={path}
      className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
    >
      <Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
};

export default FeatureCard;
