import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { AnamneseEntity } from "../models/anamnese.entity";
import { CreateAnamneseDto } from "../Dtos/Anamnese/CreateAnamneseDto";
import { UpdateAnamneseDto } from "../Dtos/Anamnese/UpdateAnamneseDto";
import { ReadAnamneseDto } from "../Dtos/Anamnese/ReadAnamneseDto";
import { IAnamneseService } from "../services/interfaces/IAnamneseService";
import { AnamneseService } from "../services/implementations/AnamneseService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";

@injectable()
export class AnamneseController extends GenericController<AnamneseEntity, CreateAnamneseDto, UpdateAnamneseDto, ReadAnamneseDto> {
  constructor(
    @inject(AnamneseService) private readonly anamneseService: IAnamneseService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(anamneseService, AnamneseEntity, CreateAnamneseDto, UpdateAnamneseDto, ReadAnamneseDto, auditoriaService);
  }
}
