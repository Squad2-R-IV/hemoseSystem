import { inject, injectable, registry } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { IGenericRepository } from "../interfaces/IGenericRepository";

@registry([
  {
    token: "GenericRepository",
    useClass: GenericRepository,
  },
])
@injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
  constructor(
    @inject("PrismaClient") private prisma: PrismaClient,
    private model: any
  ) {}

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}
