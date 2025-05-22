import { inject, injectable, registry } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { IGenericRepository } from "../interfaces/IGenericRepository";
import { handlePrismaError } from "../../utils/prismaErrorHandler";

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
    protected availableRelations: string[] = [] // Renamed to availableRelations
  ) { }

  // Helper method to generate the include object from available relations
  private generateInclude() {
    return this.availableRelations.reduce((acc, relation) => {
      acc[relation] = true;
      return acc;
    }, {} as Record<string, boolean>);
  }

  async create(data: any): Promise<T> {
    try {
      if (!this.model) {
        throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
      }
      const result = await this.model.create({ data });
      return result as T;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findAll(includeRelations: boolean = true): Promise<T[]> {
    try {
      if (!this.model) {
        throw new Error("Model is not initialized. Ensure the model is correctly set in the repository.");
      }
      const include = includeRelations ? this.generateInclude() : undefined;
      const results = await this.model.findMany({ include });
      return results as T[];
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findById(id: string | number, includeRelations: boolean = true): Promise<T | null> {
    try {
      const include = includeRelations ? this.generateInclude() : undefined;
      const result = await this.model.findUnique({
        where: { id },
        include,
      });
      return result as T | null;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findByField(field: string, value: any): Promise<T | null> {
    try {
      const result = await this.model.findFirst({ where: { [field]: value } });
      return result as T | null;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findManyByQuery(query: any, includeRelations: boolean = true): Promise<T[]> {
    try {
      const include = includeRelations ? this.generateInclude() : undefined;
      const results = await this.model.findMany({ ...query, include });
      return results as T[];
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findManyByField(field: string, value: any): Promise<T[]> {
    try {
      const results = await this.model.findMany({ where: { [field]: value } });
      return results as T[];
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findByFields(fields: { field: string; value: any }[], includeRelations: boolean = true): Promise<T | null> {
    try {
      const whereClause: { [key: string]: any } = fields.reduce((acc, { field, value }) => {
        acc[field] = value;
        return acc;
      }, {} as { [key: string]: any });

      const include = includeRelations ? this.generateInclude() : undefined;
      const result = await this.model.findFirst({ where: whereClause, include });
      return result as T | null;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findManyByFields(fields: { field: string; value: any }[], includeRelations: boolean = true): Promise<T[]> {
    try {
      const whereClause: { [key: string]: any } = fields. reduce((acc, { field, value }) => {
        acc[field] = value;
        return acc;
      }, {} as { [key: string]: any });

      const include = includeRelations ? this.generateInclude() : undefined;

      const results = await this.model.findMany({ where: whereClause, include });
      return results as T[];
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    try {
      const entity = await this.findById(id);
      if (!entity) return null;
      const result = await this.model.update({ where: { id: id }, data });
      return result as T;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      await this.model.delete({ where: { id } });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}