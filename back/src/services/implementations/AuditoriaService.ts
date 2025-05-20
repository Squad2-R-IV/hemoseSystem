import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { AuditoriaRepository } from "../../repositories/implementations/AuditoriaRepository";
import { IAuditoriaService } from "../interfaces/IAuditoriaService";
import { Auditoria } from "@prisma/client";

@injectable()
@registry([
  {
      token: 'AuditoriaService',
      useClass: AuditoriaService
  },
])
export class AuditoriaService extends GenericService<Partial<Auditoria>> implements IAuditoriaService {
  constructor(
    @inject("AuditoriaRepository") auditoriaRepository: AuditoriaRepository,
  ) {
    super(auditoriaRepository); // Pass auditoriaService to super
  }


}