import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { ConsultaEntity } from "../models/consulta.entity";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreateConsultaDto } from "../Dtos/Consulta/CreateConsultaDto";
import { UpdateConsultaDto } from "../Dtos/Consulta/UpdateConsultaDto";
import { ReadConsultaDto } from "../Dtos/Consulta/ReadConsultaDto";
import { IConsultaService } from "../services/interfaces/IConsultaService";
import { ConsultaService } from "../services/implementations/ConsultaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";

@injectable()
export class ConsultaController extends GenericController<ConsultaEntity, CreateConsultaDto, UpdateConsultaDto, ReadConsultaDto> {
  constructor(
    @inject(ConsultaService) private readonly consultaService: IConsultaService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
) {
    super(consultaService, ConsultaEntity, CreateConsultaDto, UpdateConsultaDto, ReadConsultaDto, auditoriaService);
  }
}