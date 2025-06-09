import React from "react";
import { Button, Tooltip } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PageHeaderProps {
    title: string;
    onBackClick: () => void;
}

export function PageHeader({ title, onBackClick }: PageHeaderProps) {
    return (
        <div className="flex items-center gap-4">
            <Tooltip content="Voltar">
                <Button
                    isIconOnly
                    variant="light"
                    onClick={onBackClick}
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </Button>
            </Tooltip>
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}
