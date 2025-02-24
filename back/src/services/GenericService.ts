import { inject, injectable, registry } from "tsyringe";
import { IGenericRepository } from "../interfaces/IGenericRepository";
import { IGenericService } from "../interfaces/IGenericService";

@registry([
  {
    token: "GenericService",
    useClass: GenericService,
  },
])
@injectable()
export class GenericService<T> implements IGenericService<T> {
  constructor(@inject("GenericRepository") private repository: IGenericRepository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(data: T): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
