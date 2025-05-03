import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";

export enum StatusChamadoEnum {
    Aberto = "Aberto",
    Em_Andamento = "Em_Andamento",
    Resolvido = "Resolvido",
    Fechado = "Fechado"
}

export class ChamadosEntity {
    @AutoMap()
    id!: number;
    
    @AutoMap()
    id_usuario!: string;
    
    @AutoMap()
    tipo_problema!: string;
    
    @AutoMap()
    descricao!: string;
    
    @AutoMap()
    status!: StatusChamadoEnum;
    
    @AutoMap()
    dt_abertura!: Date;
    
    @AutoMap()
    dt_resolucao?: Date;
    
    @AutoMap(() => UserEntity)
    Usuario?: UserEntity;
} 