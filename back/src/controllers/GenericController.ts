import { Request, Response } from "express";
import { IGenericService } from "../services/interfaces/IGenericService";
import { inject } from "tsyringe";
import { plainToInstance } from "class-transformer";
import logger from "../config/winston_logger";
import { IAuditoriaService } from "../services/interfaces/IAuditoriaService";
import { AuditoriaEntity } from "../models/auditoria.entity";

export class GenericController<TEntity, TCreateDto, TUpdateDto, TReadDto> {
  protected readonly auditoriaService: IAuditoriaService;
  constructor(
    @inject('GenericService') private readonly service: IGenericService<TEntity>,
    private readonly entityClass: new () => TEntity,
    private readonly createDtoClass: new () => TCreateDto,
    private readonly updateDtoClass: new () => TUpdateDto,
    private readonly readDtoClass: new () => TReadDto,
    @inject('AuditoriaService') auditoriaService: IAuditoriaService
  ) {
    this.auditoriaService = auditoriaService;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const includeRelations = req.query.includeRelations === 'true';
      const items = await this.service.getAll(includeRelations);
      const readDtos = plainToInstance(this.readDtoClass, items);
      return res.json(readDtos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const entidade = this.entityClass.name;
    try {
      let { id } = req.params;
      const includeRelations = req.query.includeRelations === 'true';
      //Veerificar se TEntity é UsuarioEntity, se nao for, converte id para number
      const isUsuarioEntity = this.entityClass.name === "UsuarioEntity";
      let itemId;
      if (!isUsuarioEntity) {
        itemId = Number(id);
      }
      else {
        itemId = id;
      }
      const item = await this.service.getById(itemId, includeRelations);
      if (!item) return res.status(404).json({ message: "Item não encontrado" });
      const readDto = plainToInstance(this.readDtoClass, item);
      return res.json(readDto);
    } catch (error: any) {
       return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(403).json({ message: "Você não tem permissão para criar um item" });
      }

      const bodyDto = plainToInstance(this.entityClass, req.body);

      const newItem = await this.service.create(bodyDto);
      const readDto = plainToInstance(this.readDtoClass, newItem);
      if (userId) await logger.info(`Na tabela ${this.entityClass.name} foi criado por ${userId}, com os dados: ${JSON.stringify(bodyDto)}`);
      let auditoria = new AuditoriaEntity();
      auditoria.id_usuario = userId;
      auditoria.data_hora = new Date();
      auditoria.acao = "CREATE";
      auditoria.tabela = this.entityClass.name;
      auditoria.dados_anteriores = null;
      auditoria.dados_novos = JSON.stringify(newItem);
      await this.auditoriaService.create(auditoria);
      return res.status(201).json(readDto);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {


      let { id } = req.params;
      //Veerificar se TEntity é UsuarioEntity, se nao for, converte id para number
      const isUsuarioEntity = this.entityClass.name === "UsuarioEntity";
      let itemId;
      if (!isUsuarioEntity) {
        itemId = Number(id);
      }
      else {
        itemId = id;
      }
      const userId = req.user?.id;
      if (!userId) {
        return res.status(403).json({ message: "Você não tem permissão para atualizar um item" });
      }
      const previousItemData = await this.service.getById(itemId);
      if (!previousItemData) return res.status(404).json({ message: "Item não encontrado" });
      const updateDto = plainToInstance(this.entityClass, req.body);
      const updatedItem = await this.service.update(itemId, updateDto);
      if (!updatedItem) return res.status(404).json({ message: "Item não encontrado" });
      const readDto = plainToInstance(this.readDtoClass, updatedItem);
      if (userId) await logger.info(`Na tabela ${this.entityClass.name} o id ${itemId} foi atualizado por ${userId}, com os dados: ${JSON.stringify(updateDto)}`);
      let auditoria = new AuditoriaEntity();
      auditoria.id_usuario = userId;
      auditoria.data_hora = new Date();
      auditoria.acao = "UPDATE";
      auditoria.tabela = this.entityClass.name;
      auditoria.dados_anteriores = JSON.stringify(previousItemData);
      auditoria.dados_novos = JSON.stringify(updatedItem);
      await this.auditoriaService.create(auditoria);
      return res.json(readDto);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      let { id } = req.params;
      //Veerificar se TEntity é UsuarioEntity, se nao for, converte id para number
      const isUsuarioEntity = this.entityClass.name === "UsuarioEntity";
      let itemId;
      if (!isUsuarioEntity) {
        itemId = Number(id);
      }
      else {
        itemId = id;
      }
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
      await logger.info(`Na tabela ${this.entityClass.name} o id ${itemId} foi excluído por ${userId}`);
      let auditoria = new AuditoriaEntity();
      auditoria.id_usuario = userId;
      auditoria.data_hora = new Date();
      auditoria.acao = "DELETE";
      auditoria.tabela = this.entityClass.name;
      auditoria.dados_anteriores = JSON.stringify(item);
      auditoria.dados_novos = null;
      await this.auditoriaService.create(auditoria);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}


/*

    @AutoMap()
    id_auditoria!: number;
    @AutoMap()
    id_usuario!: string;
    @AutoMap()
    data_hora!: Date;
    @AutoMap()
    acao!: string;
    @AutoMap()
    tabela!: string;
    @AutoMap()
    dados_anteriores!: string | null;
    @AutoMap()
    dados_novos!: string | null;*/