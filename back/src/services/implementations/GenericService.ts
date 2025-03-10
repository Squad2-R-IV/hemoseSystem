import { inject, injectable, registry } from "tsyringe";
import { IGenericRepository } from "../../repositories/interfaces/IGenericRepository";
import { IGenericService } from "../interfaces/IGenericService";
import { IAuditoriaService } from "../interfaces/IAuditoriaService";
import { AuditoriaEntity } from "../../models/auditoria.entity";

@registry([
  {
    token: "GenericService",
    useClass: GenericService,
  },
])
@injectable()
export class GenericService<T> implements IGenericService<T> {
  protected repository: IGenericRepository<T>; // Change from private to protected
  constructor(
    @inject("GenericRepository") repository: IGenericRepository<T>,
  ) {
    this.repository = repository;
  }

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: string | number): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(data: T): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string | number): Promise<void> {
    return this.repository.delete(id);
  }
}
