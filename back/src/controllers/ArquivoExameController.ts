import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { ArquivoExame, Auditoria } from '@prisma/client';
import { IArquivoExameService } from '../services/interfaces/IArquivoExameService';
import { IAuditoriaService } from '../services/interfaces/IAuditoriaService';
import { GenericController } from './GenericController';
import { CreateArquivoExameDto } from '../Dtos/ArquivoExame/CreateArquivoExameDto';
import { UpdateArquivoExameDto } from '../Dtos/ArquivoExame/UpdateArquivoExameDto';
import { ReadArquivoExameDto } from '../Dtos/ArquivoExame/ReadArquivoExameDto';
import { ArquivoExameService } from '../services/implementations/ArquivoExameService';
import { AuditoriaService } from '../services/implementations/AuditoriaService';

@injectable()
export class ArquivoExameController extends GenericController<
    ArquivoExame,
    CreateArquivoExameDto,
    UpdateArquivoExameDto,
    ReadArquivoExameDto
> {
    constructor(
        @inject(ArquivoExameService) private arquivoExameService: IArquivoExameService,
        @inject(AuditoriaService) auditoriaService: IAuditoriaService
    ) {
        super(arquivoExameService, CreateArquivoExameDto, UpdateArquivoExameDto, ReadArquivoExameDto, auditoriaService, 'arquivo_exame');
    }


    public uploadArquivo = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({
                    error: 'Nenhum arquivo foi enviado'
                });
                return;
            }

            const { id_exame } = req.body;

            if (!id_exame) {
                res.status(400).json({
                    error: 'ID do exame é obrigatório'
                });
                return;
            }

            const exameId = parseInt(id_exame);
            if (isNaN(exameId)) {
                res.status(400).json({
                    error: 'ID do exame deve ser um número válido'
                });
                return;
            }
            
            const createDto: Omit<ArquivoExame, 'id' | 'dt_upload'> = {
                id_exame: exameId,
                nome_arquivo: req.file.originalname,
                tipo_arquivo: req.file.mimetype,
                tamanho: req.file.size,
                conteudo: req.file.buffer
            };
            
            const novoArquivo = await this.arquivoExameService.create(createDto);

            const auditoria: Omit<Auditoria, 'id'> = {
                id_usuario: req.user?.id || '',
                data_hora: new Date(),
                acao: "CREATE",
                tabela: "ArquivoExame",
                dados_anteriores: null,
                dados_novos: JSON.stringify({
                    id_arquivo: novoArquivo.id,
                    nome_arquivo: novoArquivo.nome_arquivo,
                    id_exame: novoArquivo.id_exame
                }),
            };

            await this.auditoriaService.create(auditoria);

            res.status(201).json(novoArquivo);
        } catch (error) {
            console.error('Erro no upload de arquivo:', error);
            res.status(500).json({
                error: 'Erro ao fazer upload do arquivo',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    };

    public uploadMultiplosArquivos = async (req: Request, res: Response): Promise<void> => {
        try {
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                res.status(400).json({
                    error: 'Nenhum arquivo foi enviado'
                });
                return;
            }

            const { id_exame } = req.body;

            if (!id_exame) {
                res.status(400).json({
                    error: 'ID do exame é obrigatório'
                });
                return;
            }

            const exameId = parseInt(id_exame);
            if (isNaN(exameId)) {
                res.status(400).json({
                    error: 'ID do exame deve ser um número válido'
                });
                return;
            }

            const novosArquivos = [];
            const erros = [];

            for (const file of files) {
                try {
                    const createDto: Omit<ArquivoExame, 'id' | 'dt_upload'> = {
                        id_exame: exameId,
                        nome_arquivo: file.originalname,
                        tipo_arquivo: file.mimetype,
                        tamanho: file.size,
                        conteudo: file.buffer
                    };

                    const novoArquivo = await this.arquivoExameService.create(createDto);
                    novosArquivos.push(novoArquivo);
                } catch (error) {
                    erros.push({
                        arquivo: file.originalname,
                        erro: error instanceof Error ? error.message : 'Erro desconhecido'
                    });
                }
            }

            const auditoria: Omit<Auditoria, 'id'> = {
                id_usuario: req.user?.id || '',
                data_hora: new Date(),
                acao: "CREATE",
                tabela: "ArquivoExame",
                dados_anteriores: null,
                dados_novos: JSON.stringify({
                    id_exame: exameId,
                    arquivos_enviados: files.length,
                    arquivos_sucesso: novosArquivos.length,
                    arquivos_erro: erros.length
                }),
            };
            await this.auditoriaService.create(auditoria);

            res.status(201).json({
                arquivos_salvos: novosArquivos,
                erros: erros,
                total_enviados: files.length,
                total_salvos: novosArquivos.length
            });
        } catch (error) {
            console.error('Erro no upload de múltiplos arquivos:', error);
            res.status(500).json({
                error: 'Erro ao fazer upload dos arquivos',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    };


    public findArquivosByExameId = async (req: Request, res: Response): Promise<void> => {
        try {
            const exameId = parseInt(req.params.exameId);

            if (isNaN(exameId)) {
                res.status(400).json({
                    error: 'ID do exame deve ser um número válido'
                });
                return;
            }

            const arquivos = await this.arquivoExameService.findArquivosByExameId(exameId);

           const auditoria: Omit<Auditoria, 'id'> = {
                id_usuario: req.user?.id || '',
                data_hora: new Date(),
                acao: "READ",
                tabela: "ArquivoExame",
                dados_anteriores: null,
                dados_novos: JSON.stringify({ exameId }),
            };
            await this.auditoriaService.create(
                auditoria
            );


            res.status(200).json(arquivos);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao buscar arquivos do exame',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    };


    public findArquivosByTipo = async (req: Request, res: Response): Promise<void> => {
        try {
            const tipoArquivo = req.params.tipoArquivo;

            if (!tipoArquivo || tipoArquivo.trim() === '') {
                res.status(400).json({
                    error: 'Tipo do arquivo é obrigatório'
                });
                return;
            }

            const arquivos = await this.arquivoExameService.findArquivosByTipo(tipoArquivo);

            // Registrar auditoria
            const auditoria: Omit<Auditoria, 'id'> = {
                id_usuario: req.user?.id || '',
                data_hora: new Date(),
                acao: "READ",
                tabela: "ArquivoExame",
                dados_anteriores: null,
                dados_novos: JSON.stringify({ tipoArquivo }),
            };
            await this.auditoriaService.create(
                auditoria
            );

            res.status(200).json(arquivos);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao buscar arquivos por tipo',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    };


    public downloadArquivo = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({
                    error: 'ID do arquivo deve ser um número válido'
                });
                return;
            }

            const arquivo = await this.arquivoExameService.getById(id);

            if (!arquivo) {
                res.status(404).json({
                    error: 'Arquivo não encontrado'
                });
                return;
            }
            // Registrar auditoria
            const auditoria: Omit<Auditoria, 'id'> = {
                id_usuario: req.user?.id || '',
                data_hora: new Date(),
                acao: "READ",
                tabela: "ArquivoExame",
                dados_anteriores: null,
                dados_novos: JSON.stringify({ id }),
            };
            await this.auditoriaService.create(
                auditoria
            );
            // Configurar headers para download
            res.set({
                'Content-Type': arquivo.tipo_arquivo,
                'Content-Disposition': `attachment; filename="${arquivo.nome_arquivo}"`,
                'Content-Length': arquivo.tamanho.toString()
            });

            res.end(arquivo.conteudo);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao fazer download do arquivo',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    };
}
