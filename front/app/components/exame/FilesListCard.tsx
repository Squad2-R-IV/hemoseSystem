import React from "react";
import { Card, CardHeader, CardBody, Badge, Spinner } from "@heroui/react";
import { DocumentArrowDownIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { FileCard } from "./FileCard";
import type { ReadArquivoExameDto } from "~/Dtos/ArquivoExame/ReadArquivoExameDto";

interface FilesListCardProps {
    arquivos: ReadArquivoExameDto[];
    isLoading: boolean;
    onPreviewFile: (arquivo: ReadArquivoExameDto) => void;
    onDownloadFile: (arquivo: ReadArquivoExameDto) => void;
}

export function FilesListCard({ 
    arquivos, 
    isLoading, 
    onPreviewFile, 
    onDownloadFile 
}: FilesListCardProps) {
    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <DocumentArrowDownIcon className="h-8 w-8" />
                        <div>
                            <h2 className="text-xl font-semibold">Arquivos do Exame</h2>
                            <p className="text-purple-100">Documentos e imagens relacionados</p>
                        </div>
                    </div>
                    <Badge color="warning" variant="flat" size="lg">
                        {arquivos.length} arquivo(s)
                    </Badge>
                </div>
            </CardHeader>
            <CardBody>
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <Spinner />
                    </div>
                ) : arquivos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {arquivos.map((arquivo) => (
                            <FileCard
                                key={arquivo.id}
                                arquivo={arquivo}
                                onPreview={onPreviewFile}
                                onDownload={onDownloadFile}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                        <DocumentIcon className="h-12 w-12 mb-2" />
                        <p>Nenhum arquivo encontrado para este exame</p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
