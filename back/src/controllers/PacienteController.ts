import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreatePacienteDto } from "../Dtos/Paciente/CreatePacienteDto";
import { UpdatePacienteDto } from "../Dtos/Paciente/UpdatePacienteDto";
import { ReadPacienteDto } from "../Dtos/Paciente/ReadPacienteDto";
import { IPacienteService } from "../services/interfaces/IPacienteService";
import { PacienteService } from "../services/implementations/PacienteService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { Request, Response } from "express";
import { Paciente } from "@prisma/client";

@injectable()
export class PacienteController extends GenericController<Paciente, CreatePacienteDto, UpdatePacienteDto, ReadPacienteDto> {
  constructor(
    @inject(PacienteService) private readonly pacienteService: IPacienteService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      pacienteService,
      CreatePacienteDto,
      UpdatePacienteDto,
      ReadPacienteDto,
      auditoriaService,
      "Paciente" // Pass the table name explicitly
    );
  }

  async findPacienteByCpf(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.params;
    const paciente = await this.pacienteService.findPacienteByCpf(cpf);
    if (!paciente) {
      return res.status(404).json({ 
        titulo: "Paciente Não Encontrado", 
        mensagem: "Não foi possível encontrar um paciente com este CPF" 
      });
    }
    return res.json(paciente);
  }
}