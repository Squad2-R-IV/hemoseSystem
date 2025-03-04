import { inject, injectable, registry } from "tsyringe";
import {Historico} from "@prisma/client";
import { GenericService } from "./GenericService";
import { IHistoricoService } from "../interfaces/IHistoricoService";
import { HistoricoRepository } from "../../repositories/implementations/HistoricoRepository";
@injectable()
@registry([
  {
      token: 'HistoricoService',
      useClass: HistoricoService
  },
])
export class HistoricoService extends GenericService<Historico> implements IHistoricoService {
  constructor(
    @inject("HistoricoRepository") historicoRepository: HistoricoRepository,
  ) {
    super(historicoRepository);
  }
 
}