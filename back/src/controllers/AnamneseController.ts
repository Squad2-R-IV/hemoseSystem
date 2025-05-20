import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { CreateAnamneseDto } from "../Dtos/Anamnese/CreateAnamneseDto";
import { UpdateAnamneseDto } from "../Dtos/Anamnese/UpdateAnamneseDto";
import { ReadAnamneseDto } from "../Dtos/Anamnese/ReadAnamneseDto";
import { IAnamneseService } from "../services/interfaces/IAnamneseService";
import { AnamneseService } from "../services/implementations/AnamneseService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { Anamnese } from "@prisma/client";

@injectable()
export class AnamneseController extends GenericController<Anamnese, CreateAnamneseDto, UpdateAnamneseDto, ReadAnamneseDto> {
  constructor(
    @inject(AnamneseService) private readonly anamneseService: IAnamneseService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      anamneseService,
      CreateAnamneseDto,
      UpdateAnamneseDto,
      ReadAnamneseDto,
      auditoriaService,
      "Anamnese" // Pass the table name explicitly
    );
  }
}
