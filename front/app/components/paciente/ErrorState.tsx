import React from "react";
import { Button } from "@heroui/react";

interface ErrorStateProps {
    message: string;
    buttonText: string;
    onButtonClick: () => void;
}

export function ErrorState({ message, buttonText, onButtonClick }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 mb-4">{message}</p>
            <Button color="primary" onClick={onButtonClick}>
                {buttonText}
            </Button>
        </div>
    );
}
