import { Request, Response } from "express";
import { IGenericService } from "../services/interfaces/IGenericService";
import { inject } from "tsyringe";
import { plainToInstance } from "class-transformer";
import logger from "../config/winston_logger";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { Auditoria } from "@prisma/client";
import { nameof } from "ts-simple-nameof";

export class GenericController<TEntity, TCreateDto, TUpdateDto, TReadDto> {
  protected readonly auditoriaService: IAuditoriaService;
  private readonly tableName: string;

  constructor(
    @inject('GenericService') private readonly service: IGenericService<TEntity>,
    private readonly createDtoClass: new () => TCreateDto,
    private readonly updateDtoClass: new () => TUpdateDto,
    private readonly readDtoClass: new () => TReadDto,
    @inject('AuditoriaService') auditoriaService: IAuditoriaService,
    tableName: string // Explicitly pass the table name
  ) {
    this.auditoriaService = auditoriaService;
    this.tableName = tableName; // Use the provided table name
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const includeRelations = req.query.includeRelations === 'true';
    const items = await this.service.getAll(includeRelations);
    const readDtos = plainToInstance(this.readDtoClass, items);
    return res.json(readDtos);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const itemId = isNaN(Number(req.params.id)) ? req.params.id : Number(req.params.id);
    const item = await this.service.getById(itemId, req.query.includeRelations === 'true');
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    const readDto = plainToInstance(this.readDtoClass, item);
    return res.json(readDto);
  }

  async create(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).json({ message: "Você não tem permissão para criar um item" });
    }

    const bodyDto = req.body as TEntity;

    const newItem = await this.service.create(bodyDto);
    const readDto = plainToInstance(this.readDtoClass, newItem);
    if (req.user?.id) {
      await logger.info(
        `Na tabela foi criado por ${req.user.id}, com os dados: ${JSON.stringify(bodyDto)}`
      );
    }
    const auditoria: Omit<Auditoria, 'id'> = {
      id_usuario: req.user?.id || '',
      data_hora: new Date(),
      acao: "CREATE",
      tabela: this.tableName,
      dados_anteriores: null,
      dados_novos: JSON.stringify(newItem),
    };
    await this.auditoriaService.create(auditoria);
    return res.status(201).json(readDto);
  }

  async update(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    let { id } = req.params;
    const itemId = isNaN(Number(id)) ? id : Number(id);
    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).json({ message: "Você não tem permissão para atualizar um item" });
    }
    const previousItemData = await this.service.getById(itemId);
    if (!previousItemData) return res.status(404).json({ message: "Item não encontrado" });
    const updateDto = req.body as TEntity;
    const updatedItem = await this.service.update(itemId, updateDto);
    const readDto = plainToInstance(this.readDtoClass, updatedItem);
    if (req.user?.id) {
      await logger.info(
        `Na tabela o id ${itemId} foi atualizado por ${req.user.id}, com os dados: ${JSON.stringify(updateDto)}`
      );
    }
    const auditoria: Omit<Auditoria, 'id'> = {
      id_usuario: req.user?.id || '',
      data_hora: new Date(),
      acao: "UPDATE",
      tabela: this.tableName,
      dados_anteriores: JSON.stringify(previousItemData),
      dados_novos: JSON.stringify(updatedItem),
    };
    await this.auditoriaService.create(auditoria);
    return res.json(readDto);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    // Removido o try/catch para permitir que erros sejam tratados pelo middleware global
    let { id } = req.params;
    const itemId = isNaN(Number(id)) ? id : Number(id);
    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).json({ message: "Você não tem permissão para atualizar um item" });
    }
    if (userId === id) {
      return res.status(403).json({ message: "Você não pode excluir a si mesmo" });
    }
    const item = await this.service.getById(itemId);
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    await this.service.delete(itemId);
    if (req.user?.id) {
      await logger.info(
        `Na tabela o id ${itemId} foi excluído por ${req.user.id}`
      );
    }
    const auditoria: Omit<Auditoria, 'id'> = {
      id_usuario: req.user?.id || '',
      data_hora: new Date(),
      acao: "DELETE",
      tabela: this.tableName,
      dados_anteriores: JSON.stringify(item),
      dados_novos: null,
    };
    await this.auditoriaService.create(auditoria);
    return res.status(204).send();
  }
}

