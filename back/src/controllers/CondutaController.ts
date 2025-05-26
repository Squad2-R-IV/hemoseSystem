import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateCondutaDto } from "../Dtos/Conduta/CreateCondutaDto";
import { UpdateCondutaDto } from "../Dtos/Conduta/UpdateCondutaDto";
import { ReadCondutaDto } from "../Dtos/Conduta/ReadCondutaDto";
import { ICondutaService } from "../services/interfaces/ICondutaService";
import { CondutaService } from "../services/implementations/CondutaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { Conduta } from "@prisma/client";

@injectable()
export class CondutaController extends GenericController<
  Conduta,
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
      CreateCondutaDto,
      UpdateCondutaDto,
      ReadCondutaDto,
      auditoriaService,
      "Conduta" // Pass the table name explicitly
    );
  }
  async getCondutasByConsultaId(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const consultaId = parseInt(req.query.consultaId as string);
    if (isNaN(consultaId)) {
      return res.status(400).json({ message: "consultaId deve ser um número válido" });
    }
    const condutas = await this.condutaService.getCondutasByConsultaId(Number(consultaId));
    return res.json(condutas);
  }
}
