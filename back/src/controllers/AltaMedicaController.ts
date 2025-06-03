import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { CreateAltaMedicaDto } from "../Dtos/AltaMedica/CreateAltaMedicaDto";
import { UpdateAltaMedicaDto } from "../Dtos/AltaMedica/UpdateAltaMedicaDto";
import { ReadAltaMedicaDto } from "../Dtos/AltaMedica/ReadAltaMedicaDto";
import { IAltaMedicaService } from "../services/interfaces/IAltaMedicaService";
import { AltaMedicaService } from "../services/implementations/AltaMedicaService";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaService } from "../services/implementations/AuditoriaService";
import { AltaMedica } from "@prisma/client";

@injectable()
export class AltaMedicaController extends GenericController<
  AltaMedica,
  CreateAltaMedicaDto,
  UpdateAltaMedicaDto,
  ReadAltaMedicaDto
> {
  constructor(
    @inject(AltaMedicaService) private readonly altaMedicaService: IAltaMedicaService,
    @inject(AuditoriaService) auditoriaService: IAuditoriaService
  ) {
    super(
      altaMedicaService,
      CreateAltaMedicaDto,
      UpdateAltaMedicaDto,
      ReadAltaMedicaDto,
      auditoriaService,
      "AltaMedica" // Pass the table name explicitly
    );
  }    async getAltaMedicaByConsultaId(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const consultaId = parseInt(req.query.consultaId as string);
    if (isNaN(consultaId)) {
      return res.status(400).json({ message: "consultaId deve ser um número válido" });
    }
    const altaMedica = await this.altaMedicaService.getAltaMedicaByConsultaId(Number(consultaId));
    return res.json(altaMedica);
  }
}
