import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { GenericRepository } from "./GenericRepository";
import { IAuditoriaRepository } from "../interfaces/IAuditoriaRepository";
import { Auditoria } from "@prisma/client";

@registry([
  {
    token: 'AuditoriaRepository',
    useClass: AuditoriaRepository,
  },
])
@injectable()
export class AuditoriaRepository extends GenericRepository<Auditoria> implements IAuditoriaRepository {
  constructor() {
    super(prisma, prisma.auditoria, ['Usuario']);
  }
}