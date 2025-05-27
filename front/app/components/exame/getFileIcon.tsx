import React from "react";
import { PhotoIcon, DocumentTextIcon, DocumentIcon } from "@heroicons/react/24/outline";

export function getFileIcon(tipoArquivo: string, nomeArquivo: string): React.ReactNode {
    const lowerName = nomeArquivo.toLowerCase();
    const lowerType = tipoArquivo.toLowerCase();

    if (lowerType.includes("image") || 
        ["jpg", "jpeg", "png", "gif", "bmp", "webp"].some(ext => lowerName.endsWith(ext))) {
        return <PhotoIcon className="h-8 w-8 text-blue-500" />;
    } else if (lowerType.includes("pdf") || lowerName.endsWith(".pdf")) {
        return <DocumentTextIcon className="h-8 w-8 text-red-500" />;
    } else {
        return <DocumentIcon className="h-8 w-8 text-gray-500" />;
    }
}
