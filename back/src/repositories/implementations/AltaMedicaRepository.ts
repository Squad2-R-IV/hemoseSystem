import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IAltaMedicaRepository } from "../interfaces/IAltaMedicaRepository";
import { GenericRepository } from "./GenericRepository";
import { AltaMedicaEntity } from "../../models/altaMedica.entity";

@registry([
  {
    token: 'AltaMedicaRepository',
    useClass: AltaMedicaRepository,
  },
])
@injectable()
export class AltaMedicaRepository extends GenericRepository<any> implements IAltaMedicaRepository {
  constructor() {
    super(prisma, prisma.altaMedica, AltaMedicaEntity, ['Consulta', 'Medico']);
  }
} 