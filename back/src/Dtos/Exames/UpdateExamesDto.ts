import { AutoMap } from "@automapper/classes";

export class UpdateExamesDto {
    @AutoMap()
    id_funcionario?: string;
    
    @AutoMap()
    tipo_do_exame?: string;
    
    @AutoMap()
    resultado?: string;
    
    @AutoMap()
    profissional_responsavel?: string;
    
    @AutoMap()
    status?: string;
} 