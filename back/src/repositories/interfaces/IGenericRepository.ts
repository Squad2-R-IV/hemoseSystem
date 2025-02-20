export interface IGenericRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findByField(field: string, value: string): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
  }
  