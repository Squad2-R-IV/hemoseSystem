import { AutoMap } from "@automapper/classes";
import { UserToRoleEntity } from "./userToRole.entity";
import { AgendamentoEntity } from "./agendamento.entity";
import { AuditoriaEntity } from "./auditoria.entity";
import { AnamneseEntity } from "./anamnese.entity";

export class UserEntity {
    @AutoMap()
    id!: string;
    @AutoMap()
    name!: string;
    @AutoMap()
    password!: string;
    @AutoMap()
    email!: string;
    @AutoMap()
    cpf!: string;
    @AutoMap()
    contato!: string;
    @AutoMap()
    status!: string;
    @AutoMap()
    especialidade!: string;
    @AutoMap()
    conselho!: string; 
    @AutoMap()
    registro! : string;
    refreshToken!: string; 
    @AutoMap(() => [UserToRoleEntity])
    roles?: UserToRoleEntity[];
    @AutoMap(() => [AgendamentoEntity])
    agendamentos?: AgendamentoEntity[];
    @AutoMap(() => [AuditoriaEntity])
    auditorias?: AuditoriaEntity[];
    @AutoMap(() => [AnamneseEntity])
    Anamneses?: AnamneseEntity[];
}
