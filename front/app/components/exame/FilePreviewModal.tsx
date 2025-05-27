import React, { useEffect } from "react";
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    Image,
    Spinner 
} from "@heroui/react";
import { ArrowDownTrayIcon, DocumentTextIcon, DocumentIcon } from "@heroicons/react/24/outline";
import type { ReadArquivoExameDto } from "~/Dtos/ArquivoExame/ReadArquivoExameDto";
import { getFileIcon } from './getFileIcon';

interface FilePreviewModalProps {
    isOpen: boolean;
    selectedFile: ReadArquivoExameDto | null;
    previewMode: "image" | "pdf" | "document";
    onDownload: (arquivo: ReadArquivoExameDto) => void;
    getFilePreviewUrl: (arquivo: ReadArquivoExameDto) => string | null;
    isDownloading?: boolean;
    isFetching?: boolean;
    onClose: () => void;  // Make sure onClose is properly typed and required
}

export function FilePreviewModal({
    isOpen,
    onClose,
    selectedFile,
    previewMode,
    onDownload,
    getFilePreviewUrl,
    isDownloading = false,
    isFetching = false
}: FilePreviewModalProps) {
    const previewUrl = selectedFile ? getFilePreviewUrl(selectedFile) : null;
    const isLoadingPreview = selectedFile && !previewUrl && !isDownloading;
    
    // Cleanup function to handle disposal of resources
    const handleClose = () => {
        // Revoke any object URLs to prevent memory leaks
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        
        // Call the parent's onClose function
        onClose();
    };
    
    // Cleanup on unmount or when previewUrl changes
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);
    
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            size="5xl" 
            scrollBehavior="normal"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent>
                <ModalHeader className="flex items-center gap-3">
                    {selectedFile && getFileIcon(selectedFile.tipo_arquivo, selectedFile.nome_arquivo)}
                    <div>
                        <h3 className="text-lg font-semibold">{selectedFile?.nome_arquivo}</h3>
                        <p className="text-sm text-gray-400">{selectedFile?.tipo_arquivo}</p>
                    </div>
                </ModalHeader>                <ModalBody>
                    {selectedFile && (
                        <div className="flex justify-center">
                            {isLoadingPreview ? (
                                <div className="w-full h-96 flex items-center justify-center">
                                    <div className="text-center">
                                        <Spinner size="lg" className="mb-4" />
                                        <p className="text-gray-400">Carregando preview...</p>
                                    </div>
                                </div>
                            ) : previewUrl ? (
                                <>
                                    {previewMode === "image" && (
                                        <div className="w-full">
                                            <Image
                                                src={previewUrl}
                                                alt={selectedFile.nome_arquivo}
                                                className="max-w-full max-h-[70vh] object-contain mx-auto"
                                                fallbackSrc="/placeholder-image.png"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    
                                    {previewMode === "pdf" && (
                                        <div className="w-full h-[70vh] border rounded-lg overflow-hidden">
                                            <iframe
                                                src={previewUrl}
                                                className="w-full h-full"
                                                title={selectedFile.nome_arquivo}
                                            />
                                        </div>
                                    )}
                                    
                                    {previewMode === "document" && (
                                        <div className="w-full h-96 border rounded-lg flex items-center justify-center bg-gray-100">
                                            <div className="text-center">
                                                <DocumentIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                                                <p className="text-gray-600">Pré-visualização não disponível</p>
                                                <p className="text-sm text-gray-500">Use o botão de download para acessar o arquivo</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-96 border rounded-lg flex items-center justify-center bg-gray-100">
                                    <div className="text-center">
                                        <DocumentIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                                        <p className="text-gray-600">Erro ao carregar preview</p>
                                        <p className="text-sm text-gray-500">Use o botão de download para acessar o arquivo</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </ModalBody>                <ModalFooter>
                    <Button color="danger" variant="light" onPress={handleClose}>
                        Fechar
                    </Button>
                    <Button 
                        color="primary" 
                        startContent={<ArrowDownTrayIcon className="h-4 w-4" />}
                        onPress={() => selectedFile && onDownload(selectedFile)}
                        isLoading={isDownloading}
                        isDisabled={isDownloading}
                    >
                        {isDownloading ? "Baixando..." : "Download"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
