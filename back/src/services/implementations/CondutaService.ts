import { inject, injectable, registry } from "tsyringe";
import { Conduta } from "@prisma/client";
import { GenericService } from "./GenericService";
import { ICondutaService } from "../interfaces/ICondutaService";
import { CondutaRepository } from "../../repositories/implementations/CondutaRepository";
import { CondutaEntity } from "../../models/conduta.entity";
import { CondutaWithRelations } from "../../utils/includeTypes";

@injectable()
@registry([
  {
    token: 'CondutaService',
    useClass: CondutaService,
  },
])
export class CondutaService extends GenericService<CondutaWithRelations> implements ICondutaService {
  constructor(
    @inject("CondutaRepository") condutaRepository: CondutaRepository,
  ) {
    super(condutaRepository);
  }
}
