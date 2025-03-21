import { inject, injectable, registry } from "tsyringe";
import { GenericService } from "./GenericService";
import { AnamneseRepository } from "../../repositories/implementations/AnamneseRepository";
import { IAnamneseService } from "../interfaces/IAnamneseService";
import { Anamnese } from "@prisma/client";

@injectable()
@registry([
  {
      token: 'AnamneseService',
      useClass: AnamneseService
  },
])
export class AnamneseService extends GenericService<Anamnese> implements IAnamneseService {
  constructor(
    @inject("AnamneseRepository") anamneseRepository: AnamneseRepository,
  ) {
    super(anamneseRepository); // Pass anamneseRepository to super
  }
}
