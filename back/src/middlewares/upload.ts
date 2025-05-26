import multer from 'multer';
import { Request } from 'express';
import path from 'path';

// Configuração de storage em memória para salvar no banco
const storage = multer.memoryStorage();

// Filtro de tipos de arquivo permitidos
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Tipos de arquivo permitidos para exames médicos
    const allowedTypes = [
        'application/pdf',           // PDF
        'image/jpeg',               // JPEG
        'image/jpg',                // JPG
        'image/png',                // PNG
        'image/tiff',               // TIFF
        'application/dicom',        // DICOM
        'application/vnd.ms-excel', // Excel
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel XLSX
        'text/plain',               // TXT
        'application/msword',       // DOC
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}. Tipos permitidos: PDF, JPEG, PNG, TIFF, DICOM, Excel, Word, TXT`));
    }
};

// Configuração do multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // Limite de 50MB por arquivo
        files: 10 // Máximo 10 arquivos por upload
    }
});

// Middleware para upload único - corrigido para 'file'
export const uploadSingle = upload.single('file');

// Middleware para múltiplos uploads - corrigido para 'files'
export const uploadMultiple = upload.array('files', 10);

// Middleware para campos múltiplos
export const uploadFields = upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'files', maxCount: 10 }
]);

export default upload;
