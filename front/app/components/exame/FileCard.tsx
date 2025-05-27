import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Badge, Tooltip } from "@heroui/react";
import { EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { formatDateTime } from "~/utils/formatting";
import type { ReadArquivoExameDto } from "~/Dtos/ArquivoExame/ReadArquivoExameDto";
import { getFileIcon } from './getFileIcon';

interface FileCardProps {
    arquivo: ReadArquivoExameDto;
    onPreview: (arquivo: ReadArquivoExameDto) => void;
    onDownload: (arquivo: ReadArquivoExameDto) => void;
}

export function FileCard({ arquivo, onPreview, onDownload }: FileCardProps) {
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <Card 
            className="border hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            isPressable
            onPress={() => onPreview(arquivo)}
        >
            <CardHeader className="pb-2">
                <div className="flex items-center gap-3 w-full">
                    <div className="p-2 rounded-lg bg-gray-100">
                        {getFileIcon(arquivo.tipo_arquivo, arquivo.nome_arquivo)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <Tooltip content={arquivo.nome_arquivo}>
                            <p className="font-medium truncate text-sm">{arquivo.nome_arquivo}</p>
                        </Tooltip>
                        <p className="text-xs text-gray-500">{arquivo.tipo_arquivo}</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="pt-0 pb-2">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Tamanho:</span>
                        <Badge size="sm" variant="flat" color="default">
                            {formatFileSize(arquivo.tamanho)}
                        </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Upload:</span>
                        <span className="font-medium text-xs">{formatDateTime(arquivo.dt_upload)}</span>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                    <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<EyeIcon className="h-3 w-3" />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onPreview(arquivo);
                        }}
                        className="flex-1 text-xs"
                    >
                        Ver
                    </Button>
                    <Button
                        size="sm"
                        color="secondary"
                        variant="flat"
                        startContent={<ArrowDownTrayIcon className="h-3 w-3" />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDownload(arquivo);
                        }}
                        className="flex-1 text-xs"
                    >
                        Download
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
