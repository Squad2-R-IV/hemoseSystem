import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CondutaEntity } from "../models/conduta.entity";
import { IGenericService } from "../services/interfaces/IGenericService";
import { CreateCondutaDto } from "../Dtos/Conduta/CreateCondutaDto";
import { UpdateCondutaDto } from "../Dtos/Conduta/UpdateCondutaDto";
import { ReadCondutaDto } from "../Dtos/Conduta/ReadCondutaDto";
import { ICondutaService } from "../services/interfaces/ICondutaService";
import { CondutaService } from "../services/implementations/CondutaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";

@injectable()
export class CondutaController extends GenericController<
  CondutaEntity,
  CreateCondutaDto,
  UpdateCondutaDto,
  ReadCondutaDto
> {
  constructor(
    @inject(CondutaService) private readonly condutaService: ICondutaService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      condutaService,
      CondutaEntity,
      CreateCondutaDto,
      UpdateCondutaDto,
      ReadCondutaDto,
      auditoriaService
    );
  }
  async getCondutasByConsultaId(req: Request, res: Response): Promise<Response> {
    try {
      const consultaId = parseInt(req.query.consultaId as string);
      if (isNaN(consultaId)) {
        return res.status(400).json({ message: "consultaId deve ser um número válido" });
      }
      const condutas = await this.condutaService.getCondutasByConsultaId(Number(consultaId));
      return res.json(condutas);
    } catch (error: any) {
      return res.status(500).json({ message: error?.message || "Erro ao buscar condutas" });
    }
  }
}
