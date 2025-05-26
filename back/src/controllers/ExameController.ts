import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { Exame } from '@prisma/client';
import { IExameService } from '../services/interfaces/IExameService';
import { IAuditoriaService } from '../services/interfaces/IAuditoriaService';
import { GenericController } from './GenericController';
import { CreateExameDto } from '../Dtos/Exame/CreateExameDto';
import { UpdateExameDto } from '../Dtos/Exame/UpdateExameDto';
import { ReadExameDto } from '../Dtos/Exame/ReadExameDto';
import { ExameService } from '../services/implementations/ExameService';
import { AuditoriaService } from '../services/implementations/AuditoriaService';

@injectable()
export class ExameController extends GenericController<
    Exame,
    CreateExameDto,
    UpdateExameDto,
    ReadExameDto
> {
    constructor(
        @inject(ExameService) private readonly exameService: IExameService,
        @inject(AuditoriaService) auditoriaService: IAuditoriaService
    ) {
        super(
            exameService, 
            CreateExameDto,
            UpdateExameDto,
            ReadExameDto, 
            auditoriaService, 
            'exame');
    }

    public findExamesByPacienteId = async (req: Request, res: Response): Promise<void> => {
        try {
            const pacienteId = parseInt(req.params.pacienteId);

            if (isNaN(pacienteId)) {
                res.status(400).json({
                    error: 'ID do paciente deve ser um número válido'
                });
                return;
            }

            const exames = await this.exameService.findExamesByPacienteId(pacienteId);

            // Registrar auditoria
            const auditoria = {
                id_usuario: req.user?.id || '',
                data_hora: new Date(),
                acao: 'READ' as const,
                tabela: 'exame',
                dados_anteriores: null,
                dados_novos: JSON.stringify({ action: 'findExamesByPacienteId', pacienteId })
            };
            await this.auditoriaService.create(auditoria);

            res.status(200).json(exames);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao buscar exames do paciente',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    };

    public findExamesByStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const status = req.params.status;

            if (!status || status.trim() === '') {
                res.status(400).json({
                    error: 'Status do exame é obrigatório'
                });
                return;
            }

            const exames = await this.exameService.findExamesByStatus(status);

            // Registrar auditoria
            const auditoria = {
                id_usuario: req.user?.id || '',
                data_hora: new Date(),
                acao: 'READ' as const,
                tabela: 'exame',
                dados_anteriores: null,
                dados_novos: JSON.stringify({ action: 'findExamesByStatus', status })
            };
            await this.auditoriaService.create(auditoria);

            res.status(200).json(exames);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao buscar exames por status',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    };
}
