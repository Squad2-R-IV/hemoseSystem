import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IPacienteRepository } from "../interfaces/IPacienteRepository";
import { GenericRepository } from "./GenericRepository";
import { PacienteEntity } from "../../models/paciente.entity";
import { Paciente } from "@prisma/client";

@registry([
  {
    token: 'PacienteRepository',
    useClass: PacienteRepository,
  },
])
@injectable()
export class PacienteRepository extends GenericRepository<Paciente> implements IPacienteRepository {
  constructor() {
    super(prisma, prisma.paciente, PacienteEntity, ['agendamentos']);
  }
}