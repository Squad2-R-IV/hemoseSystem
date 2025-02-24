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

  async findByField(field: string, value: string): Promise<T | null> {
    return this.model.findFirst({ where: { [field]: value } });
  }

  async findManyByField(field: string, value: string): Promise<T[]> {
    return this.model.findMany({ where: { [field]: value } });
  }

  async findByFields(fields: { field: string, value: string }[]): Promise<T | null> {
    const whereClause: { [key: string]: string } = fields.reduce((acc, { field, value }) => {
      acc[field] = value;
      return acc;
    }, {} as { [key: string]: string }); // Explicitly type the accumulator
    return this.model.findFirst({ where: whereClause });
  }

  async findManyByFields(fields: { field: string, value: string }[]): Promise<T[]> {
    const whereClause: { [key: string]: string } = fields.reduce((acc, { field, value }) => {
      acc[field] = value;
      return acc;
    }, {} as { [key: string]: string }); // Explicitly type the accumulator
    return this.model.findMany({ where: whereClause });
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) return null;
    return this.model.update({ where: { id: id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}

