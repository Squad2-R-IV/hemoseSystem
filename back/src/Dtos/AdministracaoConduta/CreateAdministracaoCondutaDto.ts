import { AutoMap } from "@automapper/classes";

export class CreateAdministracaoCondutaDto {
    @AutoMap()
    id_conduta!: number;
    
    @AutoMap()
    id_funcionario!: string;
    
    @AutoMap()
    hora_administracao!: Date;
    
    @AutoMap()
    observacoes?: string;
} 