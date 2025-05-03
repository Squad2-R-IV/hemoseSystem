import { AutoMap } from "@automapper/classes";
import { ReadConsultaDto } from "../Consulta/ReadConsultaDto";
import { ReadLeitoDto } from "../Leito/ReadLeitoDto";

export class ReadLeitoConsultaDto {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_consulta!: number;
    
    @AutoMap()
    id_leito!: number;
    
    @AutoMap()
    dt_entrada!: Date;
    
    @AutoMap()
    dt_saida?: Date;
    
    @AutoMap(() => ReadConsultaDto)
    Consulta?: ReadConsultaDto;
    
    @AutoMap(() => ReadLeitoDto)
    Leito?: ReadLeitoDto;
} 