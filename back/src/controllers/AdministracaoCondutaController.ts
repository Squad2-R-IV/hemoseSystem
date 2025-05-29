import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateAdministracaoCondutaDto } from "../Dtos/AdministracaoConduta/CreateAdministracaoCondutaDto";
import { UpdateAdministracaoCondutaDto } from "../Dtos/AdministracaoConduta/UpdateAdministracaoCondutaDto";
import { ReadAdministracaoCondutaDto } from "../Dtos/AdministracaoConduta/ReadAdministracaoCondutaDto";
import { IAdministracaoCondutaService } from "../services/interfaces/IAdministracaoCondutaService";
import { AdministracaoCondutaService } from "../services/implementations/AdministracaoCondutaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { AdministracaoConduta } from "@prisma/client";

@injectable()
export class AdministracaoCondutaController extends GenericController<
  AdministracaoConduta,
  CreateAdministracaoCondutaDto,
  UpdateAdministracaoCondutaDto,
  ReadAdministracaoCondutaDto
> {
  constructor(
    @inject(AdministracaoCondutaService) private readonly administracaoCondutaService: IAdministracaoCondutaService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      administracaoCondutaService,
      CreateAdministracaoCondutaDto,
      UpdateAdministracaoCondutaDto,
      ReadAdministracaoCondutaDto,
      auditoriaService,
      "AdministracaoConduta" // Pass the table name explicitly
    );
  }

  async getAdministracaoCondutaByCondutaId(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const condutaId = parseInt(req.query.condutaId as string);
    if (isNaN(condutaId)) {
      return res.status(400).json({ message: "condutaId deve ser um número válido" });
    }
    const administracaoCondutas = await this.administracaoCondutaService.getAdministracaoCondutaByCondutaId(Number(condutaId));
    return res.json(administracaoCondutas);
  }
}
