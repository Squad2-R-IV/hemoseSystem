import { inject, injectable, registry } from "tsyringe";
import { IGenericRepository } from "../../repositories/interfaces/IGenericRepository";
import { IGenericService } from "../interfaces/IGenericService";

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

  async getAll(includeRelations?: boolean): Promise<T[]> {
    return this.repository.findAll(includeRelations);
  }

  async getById(id: string | number, includeRelations?: boolean): Promise<T | null> {
    return this.repository.findById(id, includeRelations);
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
