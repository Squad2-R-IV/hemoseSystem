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

@injectable()
export class AgendamentoController extends GenericController<AgendamentoEntity, CreateAgendamentoDto, UpdateAgendamentoDto, ReadAgendamentoDto> {
  constructor(
    @inject(AgendamentoService) private readonly agendamentoService: IAgendamentoService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(agendamentoService, AgendamentoEntity, CreateAgendamentoDto, UpdateAgendamentoDto, ReadAgendamentoDto, auditoriaService);
  }
}