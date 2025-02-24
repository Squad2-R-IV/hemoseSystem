export interface IGenericRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findByFields(fields: { field: string, value: string }[]): Promise<T | null>;
  findManyByFields(fields: { field: string, value: string }[]): Promise<T[]>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}
