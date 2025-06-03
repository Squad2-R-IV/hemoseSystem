import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateEvolucaoMedicaDto } from "../Dtos/EvolucaoMedica/CreateEvolucaoMedicaDto";
import { UpdateEvolucaoMedicaDto } from "../Dtos/EvolucaoMedica/UpdateEvolucaoMedicaDto";
import { ReadEvolucaoMedicaDto } from "../Dtos/EvolucaoMedica/ReadEvolucaoMedicaDto";
import { IEvolucaoMedicaService } from "../services/interfaces/IEvolucaoMedicaService";
import { EvolucaoMedicaService } from "../services/implementations/EvolucaoMedicaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { EvolucaoMedica } from "@prisma/client";

@injectable()
export class EvolucaoMedicaController extends GenericController<
  EvolucaoMedica,
  CreateEvolucaoMedicaDto,
  UpdateEvolucaoMedicaDto,
  ReadEvolucaoMedicaDto
> {
  constructor(
    @inject(EvolucaoMedicaService) private readonly evolucaoMedicaService: IEvolucaoMedicaService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      evolucaoMedicaService,
      CreateEvolucaoMedicaDto,
      UpdateEvolucaoMedicaDto,
      ReadEvolucaoMedicaDto,
      auditoriaService,
      "EvolucaoMedica" // Pass the table name explicitly
    );
  }
  
  async getEvolucoesMedicasByConsultaId(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const consultaId = parseInt(req.query.consultaId as string);
    if (isNaN(consultaId)) {
      return res.status(400).json({ message: "consultaId deve ser um número válido" });
    }
    const evolucoes = await this.evolucaoMedicaService.getEvolucoesMedicasByConsultaId(Number(consultaId));
    return res.json(evolucoes);
  }
}
