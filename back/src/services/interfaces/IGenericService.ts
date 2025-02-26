export interface IGenericService<TEntity> {
    getAll(): Promise<TEntity[]>;
    getById(id: string): Promise<TEntity | null>;
    create(data: TEntity): Promise<TEntity>;
    update(id: string, data: Partial<TEntity>): Promise<TEntity | null>;
    delete(id: string): Promise<void>;
  }
  