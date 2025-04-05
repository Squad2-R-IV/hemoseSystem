import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { PrescricaoEntity } from "../models/prescricao.entity";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreatePrescricaoDto } from "../Dtos/Prescricao/CreatePrescricaoDto";
import { UpdatePrescricaoDto } from "../Dtos/Prescricao/UpdatePrescricaoDto";
import { ReadPrescricaoDto } from "../Dtos/Prescricao/ReadPrescricaoDto";
import { IPrescricaoService } from "../services/interfaces/IPrescricaoService";
import { PrescricaoService } from "../services/implementations/PrescricaoService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";

@injectable()
export class PrescricaoController extends GenericController<PrescricaoEntity, CreatePrescricaoDto, UpdatePrescricaoDto, ReadPrescricaoDto> {
  constructor(
    @inject(PrescricaoService) private readonly prescricaoService: IPrescricaoService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
) {
    super(prescricaoService, PrescricaoEntity, CreatePrescricaoDto, UpdatePrescricaoDto, ReadPrescricaoDto, auditoriaService);
  }
}