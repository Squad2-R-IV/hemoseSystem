import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IArquivoExameRepository } from "../interfaces/IArquivoExameRepository";
import { GenericRepository } from "./GenericRepository";
import { ArquivoExame } from "@prisma/client";

@registry([
  {
    token: 'ArquivoExameRepository',
    useClass: ArquivoExameRepository,
  },
])
@injectable()
export class ArquivoExameRepository extends GenericRepository<ArquivoExame> implements IArquivoExameRepository {
  constructor() {
    super(prisma, prisma.arquivoExame, ['Exame']);
  }
}
