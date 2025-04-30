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
    private entityClass: new () => T,
    protected availableRelations: string[] = [] // Renomeado para availableRelations
  ) { }

  // Método auxiliar para gerar o include a partir das relações disponíveis
  private generateInclude() {
    return this.availableRelations.reduce((acc, relation) => {
      acc[relation] = true;
      return acc;
    }, {} as Record<string, boolean>);
  }

  async create(data: any): Promise<T> {
    if (!this.model) {
      throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
    }
    const result = await this.model.create({ data });
    return plainToInstance(this.entityClass, result);
  }

  async findAll(includeRelations: boolean = true): Promise<T[]> {
    if (!this.model) {
      throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
    }
    const include = includeRelations ? this.generateInclude() : undefined;
    const results = await this.model.findMany({ include });
    return plainToInstance(this.entityClass, results) as T[];
  }

  async findById(id: string | number, includeRelations: boolean = true): Promise<T | null> {
    try{
    const include = includeRelations ? this.generateInclude() : undefined;
    const result = await this.model.findUnique({
      where: { id },
      include,
    });
    return result ? plainToInstance(this.entityClass, result) : null;
    }
    catch (error) {
      console.error("Error in findById:", error);
      throw error;
    }
  }

  async findByField(field: string, value: any): Promise<T | null> {
    const result = await this.model.findFirst({ where: { [field]: value } });
    return result ? plainToInstance(this.entityClass, result) : null;
  }

  async findManyByQuery(query: any, includeRelations: boolean = true): Promise<T[]> {
    try {
      const include = includeRelations ? this.generateInclude() : undefined;
      const results = await this.model.findMany({ ...query, include });
      return plainToInstance(this.entityClass, results) as T[];
    } catch (error) {
      console.error("Error in findManyByQuery:", error);
      throw error;
    }
  }

  async findManyByField(field: string, value: any): Promise<T[]> {
    const results = await this.model.findMany({ where: { [field]: value } });
    return plainToInstance(this.entityClass, results) as T[];
  }

  async findByFields(fields: { field: string; value: any }[], includeRelations: boolean = true): Promise<T | null> {
    const whereClause: { [key: string]: any } = fields.reduce((acc, { field, value }) => {
      acc[field] = value; // Directly assign the value as provided by the user
      return acc;
    }, {} as { [key: string]: any });

    const include = includeRelations ? this.generateInclude() : undefined;
    const result = await this.model.findFirst({ where: whereClause, include });
    return result ? plainToInstance(this.entityClass, result) : null;
  }

  async findManyByFields(fields: { field: string; value: any }[], includeRelations: boolean = true): Promise<T[]> {
    const whereClause: { [key: string]: any } = fields.reduce((acc, { field, value }) => {
      acc[field] = value; // Directly assign the value as provided by the user
      return acc;
    }, {} as { [key: string]: any });

    const include = includeRelations ? this.generateInclude() : undefined;

    const results = await this.model.findMany({ where: whereClause, include });
    return plainToInstance(this.entityClass, results) as T[];
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) return null;
    const result = await this.model.update({ where: { id: id }, data });
    return plainToInstance(this.entityClass, result);
  }

  async delete(id: string | number): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}