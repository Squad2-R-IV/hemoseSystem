import { Request, Response } from "express";
import { IGenericService } from "../services/interfaces/IGenericService";
import { inject } from "tsyringe";
import { mapper } from "../mappings/mapper";

export class GenericController<TEntity, TCreateDto, TUpdateDto, TReadDto> {
  constructor(
    @inject('GenericService') private readonly service: IGenericService<TEntity>,
    private readonly entityClass: new () => TEntity,
    private readonly createDtoClass: new () => TCreateDto,
    private readonly updateDtoClass: new () => TUpdateDto,
    private readonly readDtoClass: new () => TReadDto
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const items = await this.service.getAll();
      const readDtos = mapper.mapArray(items, this.entityClass, this.readDtoClass);
      return res.json(readDtos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item) return res.status(404).json({ message: "Item não encontrado" });
      const readDto = mapper.map(item, this.entityClass, this.readDtoClass);
      return res.json(readDto);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createDto = mapper.map(req.body, this.createDtoClass, this.entityClass);
      const newItem = await this.service.create(createDto);
      const readDto = mapper.map(newItem, this.entityClass, this.readDtoClass);
      return res.status(201).json(readDto);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateDto = mapper.map(req.body, this.updateDtoClass, this.entityClass);
      const updatedItem = await this.service.update(id, updateDto);
      if (!updatedItem) return res.status(404).json({ message: "Item não encontrado" });
      const readDto = mapper.map(updatedItem, this.entityClass, this.readDtoClass);
      return res.json(readDto);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}