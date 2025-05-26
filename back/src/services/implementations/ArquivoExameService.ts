import { inject, injectable, registry } from "tsyringe";
import { ArquivoExame } from "@prisma/client";
import { GenericService } from "./GenericService";
import { IArquivoExameService } from "../interfaces/IArquivoExameService";
import { ArquivoExameRepository } from "../../repositories/implementations/ArquivoExameRepository";
import { ArquivoExameWithRelations } from "../../utils/includeTypes";

type ArquivoExameCreate = Omit<ArquivoExame, 'id' | 'dt_upload'>;

@injectable()
@registry([
  {
      token: 'ArquivoExameService',
      useClass: ArquivoExameService
  },
])
export class ArquivoExameService extends GenericService<ArquivoExameWithRelations> implements IArquivoExameService {
  constructor(
    @inject("ArquivoExameRepository") arquivoExameRepository: ArquivoExameRepository,
  ) {
    super(arquivoExameRepository);
  }

  override async create(data: ArquivoExameCreate): Promise<ArquivoExame> {
    // Cast to any to bypass TypeScript checking since the database will generate id and dt_upload
    return this.repository.create(data as any);
  }

  async findArquivosByExameId(exameId: number): Promise<ArquivoExameWithRelations[]> {
    return this.repository.findManyByFields([{ field: "id_exame", value: exameId }]);
  }

  async findArquivosByTipo(tipoArquivo: string): Promise<ArquivoExameWithRelations[]> {
    return this.repository.findManyByFields([{ field: "tipo_arquivo", value: tipoArquivo }]);
  }
}
