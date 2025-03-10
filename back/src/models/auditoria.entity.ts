import { AutoMap } from "@automapper/classes";
import { JsonValue } from "@prisma/client/runtime/library";

export class AuditoriaEntity {
    @AutoMap()
    id!: number;
    @AutoMap()
    id_usuario!: string;
    @AutoMap()
    data_hora!: Date;
    @AutoMap()
    acao!: string;
    @AutoMap()
    tabela!: string;
    @AutoMap()
    dados_anteriores!: JsonValue | null;
    @AutoMap()
    dados_novos!: JsonValue | null;
}