import React, { useCallback, useState, useMemo } from "react";
import type { ReadArquivoExameDto } from "~/Dtos/ArquivoExame/ReadArquivoExameDto";
import { useDownloadArquivoQuery } from "~/services/api";

export function useFileHandler() {
    const [downloadId, setDownloadId] = useState<number | null>(null);
    const [downloadFileName, setDownloadFileName] = useState<string>("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [previewCache, setPreviewCache] = useState<Map<number, string>>(new Map());
    const [requestedPreview, setRequestedPreview] = useState<number | null>(null);
      const { data: downloadBlob, isSuccess, isError, error, isFetching } = useDownloadArquivoQuery(
        downloadId!,
        { 
            skip: downloadId === null,
            // This will force a new request every time downloadId changes
            refetchOnMountOrArgChange: true
        }
    );// Handle the download when the blob is received
    React.useEffect(() => {
        if (isSuccess && downloadBlob && downloadId !== null) {
            // Create URL for the blob
            const url = window.URL.createObjectURL(downloadBlob);
            
            // Store in cache for preview
            setPreviewCache(prev => {
                const newCache = new Map(prev);
                newCache.set(downloadId, url);
                return newCache;
            });
            
            // Only trigger download if isDownloading is true (actual download request)
            if (isDownloading) {
                const link = document.createElement("a");
                link.href = url;
                link.download = downloadFileName || `arquivo_${downloadId}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Reset download state
                setIsDownloading(false);
            }
            
            // Reset download ID after processing
            setDownloadId(null);
            setDownloadFileName("");
        }
    }, [isSuccess, downloadBlob, downloadId, downloadFileName, isDownloading]);// Handle errors
    React.useEffect(() => {
        if (isError) {
            console.error('Error downloading file:', error);
            alert(`Não foi possível baixar o arquivo. Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            setDownloadId(null);
            setDownloadFileName("");
            setIsDownloading(false);
        }
    }, [isError, error]);

    const handleDownloadFile = useCallback((arquivo: ReadArquivoExameDto) => {
        if (!isDownloading) {
            setIsDownloading(true);
            setDownloadFileName(arquivo.nome_arquivo);
            setDownloadId(arquivo.id);
        }
    }, [isDownloading]);    const getFilePreviewUrl = useCallback((arquivo: ReadArquivoExameDto) => {
        // Check if we already have this file in cache
        const cachedUrl = previewCache.get(arquivo.id);
        if (cachedUrl) {
            console.log(`Using cached preview for file ${arquivo.id}: ${arquivo.nome_arquivo}`);
            return cachedUrl;
        }

        // If not in cache and not currently fetching this specific file, trigger download for preview
        if (downloadId !== arquivo.id && !isFetching) {
            console.log(`Requesting new preview for file ${arquivo.id}: ${arquivo.nome_arquivo}`);
            setRequestedPreview(arquivo.id);
            setDownloadId(arquivo.id);
        } else if (downloadId === arquivo.id && isFetching) {
            console.log(`Already fetching file ${arquivo.id}: ${arquivo.nome_arquivo}`);
        }

        return null;
    }, [previewCache, downloadId, isFetching]);

    // Cleanup URLs when component unmounts
    React.useEffect(() => {
        return () => {
            previewCache.forEach(url => {
                window.URL.revokeObjectURL(url);
            });
        };
    }, [previewCache]);    return {
        handleDownloadFile,
        getFilePreviewUrl,
        isDownloading,
        isFetching // Add this to help with loading states
    };
}
