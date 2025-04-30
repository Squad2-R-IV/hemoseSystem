export interface IGenericRepository<T> {
  findAll(includeRelations?: boolean): Promise<T[]>;
  findById(id: string | number, includeRelations?: boolean): Promise<T | null>;
  findManyByQuery(query: any, includeRelations?: boolean): Promise<T[]> | null;
  findByFields(fields: { field: string; value: any }[], includeRelations?: boolean): Promise<T | null>;
  findManyByFields(fields: { field: string; value: any }[], includeRelations?: boolean): Promise<T[]>;
  create(data: T): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<void>;
}