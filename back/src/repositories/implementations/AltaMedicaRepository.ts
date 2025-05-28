import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IAltaMedicaRepository } from "../interfaces/IAltaMedicaRepository";
import { GenericRepository } from "./GenericRepository";
import { AltaMedica } from "@prisma/client";

@registry([
  {
    token: 'AltaMedicaRepository',
    useClass: AltaMedicaRepository,
  },
])
@injectable()
export class AltaMedicaRepository extends GenericRepository<AltaMedica> implements IAltaMedicaRepository {
  constructor() {
    super(prisma, prisma.altaMedica, ['Medico', 'Consulta']);
  }
}
