import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateEvolucaoEnfermagemDto } from "../Dtos/EvolucaoEnfermagem/CreateEvolucaoEnfermagemDto";
import { UpdateEvolucaoEnfermagemDto } from "../Dtos/EvolucaoEnfermagem/UpdateEvolucaoEnfermagemDto";
import { ReadEvolucaoEnfermagemDto } from "../Dtos/EvolucaoEnfermagem/ReadEvolucaoEnfermagemDto";
import { IEvolucaoEnfermagemService } from "../services/interfaces/IEvolucaoEnfermagemService";
import { EvolucaoEnfermagemService } from "../services/implementations/EvolucaoEnfermagemService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { EvolucaoEnfermagem } from "@prisma/client";

@injectable()
export class EvolucaoEnfermagemController extends GenericController<
  EvolucaoEnfermagem,
  CreateEvolucaoEnfermagemDto,
  UpdateEvolucaoEnfermagemDto,
  ReadEvolucaoEnfermagemDto
> {
  constructor(
    @inject(EvolucaoEnfermagemService) private readonly evolucaoEnfermagemService: IEvolucaoEnfermagemService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      evolucaoEnfermagemService,
      CreateEvolucaoEnfermagemDto,
      UpdateEvolucaoEnfermagemDto,
      ReadEvolucaoEnfermagemDto,
      auditoriaService,
      "EvolucaoEnfermagem" // Pass the table name explicitly
    );
  }
  
  async getEvolucoesEnfermagemByConsultaId(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const consultaId = parseInt(req.query.consultaId as string);
    if (isNaN(consultaId)) {
      return res.status(400).json({ message: "consultaId deve ser um número válido" });
    }
    const evolucoes = await this.evolucaoEnfermagemService.getEvolucoesEnfermagemByConsultaId(Number(consultaId));
    return res.json(evolucoes);
  }
}
