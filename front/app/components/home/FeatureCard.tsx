import React from "react";
import { Link } from "react-router";
import { Card, CardHeader, CardBody, Badge } from "@heroui/react";

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
    <Link viewTransition to={path} className="block">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-col items-center gap-1 text-center">
          <Icon className="h-10 w-10 text-primary" />
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </CardHeader>
        {metrics && metrics.length > 0 && (
          <CardBody className="space-y-2 text-sm">
            {metrics.map((m) => (
              <div key={m.label} className="flex justify-between items-center">
                <span className="text-gray-500">{m.label}</span>
                <Badge color="primary" variant="flat" size="sm">
                  {m.value}
                </Badge>
              </div>
            ))}
          </CardBody>
        )}
      </Card>
    </Link>
  );
};

export default FeatureCard;
