import { inject, injectable } from "tsyringe";
import { GenericController } from "./GenericController";
import { HistoricoEntity } from "../models/historico.entity";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreateHistoricoDto } from "../Dtos/Historico/CreateHistoricoDto";
import { UpdateHistoricoDto } from "../Dtos/Historico/UpdateHistoricoDto";
import { ReadHistoricoDto } from "../Dtos/Historico/ReadHistoricoDto";
import { IHistoricoService } from "../services/interfaces/IHistoricoService";
import { HistoricoService } from "../services/implementations/HistoricoService";

@injectable()
export class HistoricoController extends GenericController<HistoricoEntity, CreateHistoricoDto, UpdateHistoricoDto, ReadHistoricoDto> {
  constructor(
    @inject(HistoricoService) private readonly historicoService: IHistoricoService,
) {
    super(historicoService, HistoricoEntity, CreateHistoricoDto, UpdateHistoricoDto, ReadHistoricoDto);
  }
}