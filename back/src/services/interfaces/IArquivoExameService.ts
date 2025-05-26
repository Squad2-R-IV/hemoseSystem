import { ArquivoExame } from "@prisma/client";
import { IGenericService } from "./IGenericService";

// Create a type for ArquivoExame without auto-generated fields
type ArquivoExameCreate = Omit<ArquivoExame, 'id' | 'dt_upload'>;

export interface IArquivoExameService extends IGenericService<ArquivoExame> {
    findArquivosByExameId(exameId: number): Promise<ArquivoExame[]>;
    findArquivosByTipo(tipoArquivo: string): Promise<ArquivoExame[]>;
    create(data: ArquivoExameCreate): Promise<ArquivoExame>;
}
