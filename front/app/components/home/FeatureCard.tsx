import React from 'react';
import { Link } from 'react-router';

interface Metric {
  label: string;
  value: number;
}

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  path: string;
  metrics?: Metric[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  path,
  metrics,
}) => {
  return (
    <Link
      viewTransition
      to={path}
      className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
    >
      <Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      {metrics && (
        <div className="space-y-1 text-sm">
          {metrics.map((m) => (
            <div key={m.label} className="flex justify-between w-full">
              <span className="text-gray-500">{m.label}</span>
              <span className="font-semibold text-primary">{m.value}</span>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
};

export default FeatureCard;
