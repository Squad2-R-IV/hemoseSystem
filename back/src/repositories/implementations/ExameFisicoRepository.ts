import { injectable, registry } from "tsyringe";
import prisma from "../../config/prisma";
import { IExameFisicoRepository } from "../interfaces/IExameFisicoRepository";
import { GenericRepository } from "./GenericRepository";
import { ExameFisicoEntity } from "../../models/exameFisico.entity";

@registry([
  {
    token: 'ExameFisicoRepository',
    useClass: ExameFisicoRepository,
  },
])
@injectable()
export class ExameFisicoRepository extends GenericRepository<any> implements IExameFisicoRepository {
  constructor() {
    super(prisma, prisma.exameFisico, ExameFisicoEntity, ['Anamnese', 'EvolucaoMedica']);
  }
} 