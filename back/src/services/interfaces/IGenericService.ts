export interface IGenericService<TEntity> {
    getAll(includeRelations?: boolean): Promise<TEntity[]>;
    getById(id: string | number, includeRelations?: boolean): Promise<TEntity | null>;
    create(data: TEntity): Promise<TEntity>;
    update(id: string | number, data: Partial<TEntity>): Promise<TEntity | null>;
    delete(id: string | number): Promise<void>;
}
