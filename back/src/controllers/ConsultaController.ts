import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { Request, Response } from "express";
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
  async getConsultasByPacientId(req: Request, res: Response): Promise<Response> {
    // PacienteId : number
    const pacienteId = parseInt(req.query.pacienteId as string);
    
    if (isNaN(pacienteId)) {
      return res.status(400).json({ message: "Id o paciente deve ser um número válido" });
    }
    const consultas = await this.consultaService.getConsultasByPacientId(Number(pacienteId));
    return res.json(consultas);
  }
  


}