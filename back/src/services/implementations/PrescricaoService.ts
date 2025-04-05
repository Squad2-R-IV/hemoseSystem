import { inject, injectable, registry } from "tsyringe";
import { Prescricao } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IPrescricaoService } from "../interfaces/IPrescricaoService";
import { PrescricaoRepository } from "../../repositories/implementations/PrescricaoRepository";
import { PrescricaoEntity } from "../../models/prescricao.entity";
import { PrescricaoWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'PrescricaoService',
    useClass: PrescricaoService,
  },
])
export class PrescricaoService extends GenericService<PrescricaoWithRelations> implements IPrescricaoService {
  constructor(
    @inject("PrescricaoRepository") prescricaoRepository: PrescricaoRepository,
  ) {
    super(prescricaoRepository);
  }
}
