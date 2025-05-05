import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { ITriagemRepository } from "../interfaces/ITriagemRepository";
import { GenericRepository } from "./GenericRepository";
import { TriagemEntity } from "../../models/triagem.entity";

@registry([
  {
    token: 'TriagemRepository',
    useClass: TriagemRepository,
  },
])
@injectable()
export class TriagemRepository extends GenericRepository<any> implements ITriagemRepository {
  constructor() {
    super(prisma, prisma.triagem, TriagemEntity, ['Consulta', 'Funcionario']);
  }
} 