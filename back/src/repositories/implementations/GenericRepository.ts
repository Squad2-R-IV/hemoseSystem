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

  async findAll(includeRelations?: boolean): Promise<T[]> {
    const include = includeRelations ? this.generateInclude() : undefined;
    const results = await this.model.findMany({ include });
    return plainToInstance(this.entityClass, results) as T[];
  }

  async findById(id: string | number, includeRelations?: boolean): Promise<T | null> {
    const include = includeRelations ? this.generateInclude() : undefined;
    const result = await this.model.findUnique({
      where: { id },
      include,
    });
    return result ? plainToInstance(this.entityClass, result) : null;
  }

  async findByField(field: string, value: string): Promise<T | null> {
    // Método não está na interface com includeRelations, mantendo como estava
    const result = await this.model.findFirst({ where: { [field]: value } });
    return result ? plainToInstance(this.entityClass, result) : null;
  }

  async findManyByQuery(query: any): Promise<T[]> {
    try {

      const results = await this.model.findMany(query);

      return plainToInstance(this.entityClass, results) as T[];
    }
    catch (error) {
      console.error("Error in findManyByQuery:", error);
      throw error; // Re-throw the error after logging it
    }
  }



  async findManyByField(field: string, value: string): Promise<T[]> {
    // Método não está na interface com includeRelations, mantendo como estava
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