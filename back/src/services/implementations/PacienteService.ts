import { inject, injectable, registry } from "tsyringe";
import { Paciente } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IPacienteService } from "../interfaces/IPacienteService";
import { PacienteRepository } from "../../repositories/implementations/PacienteRepository";

@injectable()
@registry([
  {
      token: 'PacienteService',
      useClass: PacienteService
  },
])
export class PacienteService extends GenericService<Paciente> implements IPacienteService {
  constructor(
    @inject("PacienteRepository") pacienteRepository: PacienteRepository,
  ) {
    super(pacienteRepository);
  }
}