import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { PacienteEntity } from "../models/paciente.entity";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreatePacienteDto } from "../Dtos/Paciente/CreatePacienteDto";
import { UpdatePacienteDto } from "../Dtos/Paciente/UpdatePacienteDto";
import { ReadPacienteDto } from "../Dtos/Paciente/ReadPacienteDto";
import { IPacienteService } from "../services/interfaces/IPacienteService";
import { PacienteService } from "../services/implementations/PacienteService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";

@injectable()
export class PacienteController extends GenericController<PacienteEntity, CreatePacienteDto, UpdatePacienteDto, ReadPacienteDto> {
  constructor(
    @inject(PacienteService) private readonly pacienteService: IPacienteService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(pacienteService, PacienteEntity, CreatePacienteDto, UpdatePacienteDto, ReadPacienteDto, auditoriaService);
  }
}