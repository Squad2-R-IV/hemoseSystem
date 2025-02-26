import { inject, injectable, registry } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { IGenericRepository } from "../interfaces/IGenericRepository";
import { plainToInstance } from "class-transformer";

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
    private model: any,
    private entityClass: new () => T
  ) {}

  async findAll(): Promise<T[]> {
    const results = await this.model.findMany();
    return plainToInstance(this.entityClass, results) as T[];
  }

  async findById(id: string): Promise<T | null> {
    const result = await this.model.findUnique({ where: { id } });
    return result ? plainToInstance(this.entityClass, result) : null;
  }

  async findByField(field: string, value: string): Promise<T | null> {
    const result = await this.model.findFirst({ where: { [field]: value } });
    return result ? plainToInstance(this.entityClass, result) : null;
  }

  async findManyByField(field: string, value: string): Promise<T[]> {
    const results = await this.model.findMany({ where: { [field]: value } });
    return plainToInstance(this.entityClass, results) as T[];
  }

  async findByFields(fields: { field: string; value: string }[]): Promise<T | null> {
    const whereClause: { [key: string]: string } = fields.reduce((acc, { field, value }) => {
      acc[field] = value;
      return acc;
    }, {} as { [key: string]: string });
    const result = await this.model.findFirst({ where: whereClause });
    return result ? plainToInstance(this.entityClass, result) : null;
  }

  async findManyByFields(fields: { field: string; value: string }[]): Promise<T[]> {
    const whereClause: { [key: string]: string } = fields.reduce((acc, { field, value }) => {
      acc[field] = value;
      return acc;
    }, {} as { [key: string]: string });
    const results = await this.model.findMany({ where: whereClause });
    return plainToInstance(this.entityClass, results) as T[];
  }

  async create(data: any): Promise<T> {
    const result = await this.model.create({ data });
    return plainToInstance(this.entityClass, result);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) return null;
    const result = await this.model.update({ where: { id: id }, data });
    return plainToInstance(this.entityClass, result);
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}