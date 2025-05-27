import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { Spinner, useDisclosure } from "@heroui/react";
import {
    useGetExameByIdQuery,
    useGetArquivosByExameIdQuery,
} from "~/services/api";
import type { ReadArquivoExameDto } from "~/Dtos/ArquivoExame/ReadArquivoExameDto";
import {
    ExameHeader,
    ExameOverviewCard,
    ExameResultCard,
    ProfessionalCard,
    ExameStatsCard,
    FilesListCard,
    FilePreviewModal,
    useFileHandler,
    getFileIcon
} from "~/components/exame";

export default function ExameDetail() {
    const { exameId } = useParams<{ exameId: string }>();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState<ReadArquivoExameDto | null>(null);
    const [previewMode, setPreviewMode] = useState<"image" | "pdf" | "document">("document");    // Use the custom file handler hook
    const { handleDownloadFile, getFilePreviewUrl } = useFileHandler();

    // Fetch exam data
    const {
        data: exame,
        isLoading: isLoadingExame,
        error: exameError,
    } = useGetExameByIdQuery(Number(exameId), {
        skip: !exameId,
    });

    // Fetch exam files
    const {
        data: arquivos = [],
        isLoading: isLoadingArquivos,
        error: arquivosError,
    } = useGetArquivosByExameIdQuery(Number(exameId), {
        skip: !exameId,
    });    const handlePreviewFile = useCallback((arquivo: ReadArquivoExameDto) => {
        setSelectedFile(arquivo);
        
        // Determine preview mode based on file type
        if (arquivo.tipo_arquivo.toLowerCase().includes("image") || 
            ["jpg", "jpeg", "png", "gif", "bmp", "webp"].some(ext => 
                arquivo.nome_arquivo.toLowerCase().endsWith(ext))) {
            setPreviewMode("image");
        } else if (arquivo.tipo_arquivo.toLowerCase().includes("pdf") || 
                   arquivo.nome_arquivo.toLowerCase().endsWith(".pdf")) {
            setPreviewMode("pdf");
        } else {
            setPreviewMode("document");
        }
        
        onOpen();
    }, [onOpen]);    if (isLoadingExame) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (exameError || !exame) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-red-500 mb-4">Erro ao carregar dados do exame</p>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded" 
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            {/* Header */}
            <ExameHeader 
                exameId={exame.id} 
                onBack={() => navigate(-1)} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Exam Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Exam Overview Card */}
                    <ExameOverviewCard exame={exame} />

                    {/* Results Card */}
                    <ExameResultCard resultado={exame.resultado} />
                </div>

                {/* Right Column - Professional Info */}
                <div className="space-y-6">
                    {/* Professional Card */}
                    <ProfessionalCard 
                        profissionalResponsavel={exame.profissional_responsavel}
                        crmProfissionalResponsavel={exame.crm_profissional_responsavel}
                    />

                    {/* Quick Stats */}
                    <ExameStatsCard 
                        totalArquivos={arquivos.length}
                        status={exame.status}
                        idPaciente={exame.id_paciente}
                    />
                </div>
            </div>

            {/* Files Section */}
            <FilesListCard
                arquivos={arquivos}
                isLoading={isLoadingArquivos}
                onPreviewFile={handlePreviewFile}
                onDownloadFile={handleDownloadFile}
            />

            {/* File Preview Modal */}         
            <FilePreviewModal
                isOpen={isOpen}
                onClose={onClose}
                selectedFile={selectedFile}
                previewMode={previewMode}
                onDownload={handleDownloadFile}
                getFilePreviewUrl={getFilePreviewUrl}
            />
        </div>
    );
}
