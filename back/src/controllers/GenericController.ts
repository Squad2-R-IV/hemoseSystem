import { Request, Response } from "express";
import { IGenericService } from "../services/interfaces/IGenericService";
import { inject } from "tsyringe";

export class GenericController<T> {
  constructor(@inject('GenericService') private readonly service: IGenericService<T>) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const items = await this.service.getAll();
      return res.json(items);
    } catch (error : any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item) return res.status(404).json({ message: "Item não encontrado" });
      return res.json(item);
    } catch (error : any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const newItem = await this.service.create(req.body);
      return res.status(201).json(newItem);
    } catch (error : any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updatedItem = await this.service.update(id, req.body);
      if (!updatedItem) return res.status(404).json({ message: "Item não encontrado" });
      return res.json(updatedItem);
    } catch (error : any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      return res.status(204).send();
    } catch (error : any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
