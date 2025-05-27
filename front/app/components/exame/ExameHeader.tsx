import React from "react";
import { Button } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface ExameHeaderProps {
    exameId: number;
    onBack: () => void;
}

export function ExameHeader({ exameId, onBack }: ExameHeaderProps) {
    return (
        <div className="flex items-center gap-4">
            <Button
                isIconOnly
                variant="light"
                onClick={onBack}
            >
                <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800">Detalhes do Exame</h1>
                <p className="text-gray-600">ID: {exameId}</p>
            </div>
        </div>
    );
}
