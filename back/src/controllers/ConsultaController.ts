import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreateConsultaDto } from "../Dtos/Consulta/CreateConsultaDto";
import { UpdateConsultaDto } from "../Dtos/Consulta/UpdateConsultaDto";
import { ReadConsultaDto } from "../Dtos/Consulta/ReadConsultaDto";
import { IConsultaService } from "../services/interfaces/IConsultaService";
import { ConsultaService } from "../services/implementations/ConsultaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { Consulta } from "@prisma/client";

@injectable()
export class ConsultaController extends GenericController<Consulta, CreateConsultaDto, UpdateConsultaDto, ReadConsultaDto> {
  constructor(
    @inject(ConsultaService) private readonly consultaService: IConsultaService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      consultaService,
      CreateConsultaDto,
      UpdateConsultaDto,
      ReadConsultaDto,
      auditoriaService,
      "Consulta" // Pass the table name explicitly
    );
  }


}