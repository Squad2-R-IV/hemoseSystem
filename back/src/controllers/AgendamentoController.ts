import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { AgendamentoEntity } from "../models/agendamento.entity";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreateAgendamentoDto } from "../Dtos/Agendamento/CreateAgendamentoDto";
import { UpdateAgendamentoDto } from "../Dtos/Agendamento/UpdateAgendamentoDto";
import { ReadAgendamentoDto } from "../Dtos/Agendamento/ReadAgendamentoDto";
import { IAgendamentoService } from "../services/interfaces/IAgendamentoService";
import { AgendamentoService } from "../services/implementations/AgendamentoService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { Request, Response } from "express";

@injectable()
export class AgendamentoController extends GenericController<AgendamentoEntity, CreateAgendamentoDto, UpdateAgendamentoDto, ReadAgendamentoDto> {
  constructor(
    @inject(AgendamentoService) private readonly agendamentoService: IAgendamentoService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(agendamentoService, AgendamentoEntity, CreateAgendamentoDto, UpdateAgendamentoDto, ReadAgendamentoDto, auditoriaService);
  }

  async getAgendamentosComConsultasAtivas(req: Request, res: Response): Promise<Response> {
    const agendamentos = await this.agendamentoService.getAgendamentosComConsultasAtivas();
    return res.json(agendamentos);
  }

  async getAgendamentosByDate(req: Request, res: Response): Promise<Response> {
    const { date } = req.params;
    
    if (!date) {
      return res.status(400).json({ message: 'Data não informada' });
    }
    
    const dateObject = new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObject.getTime())) {
      return res.status(400).json({ message: 'Data inválida' });
    }

    const agendamentos = await this.agendamentoService.getAgendamentosByDate(dateObject);
    return res.json(agendamentos);
  }
}
