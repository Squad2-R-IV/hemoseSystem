import { AutoMap } from "@automapper/classes";
import { UserToRoleEntity } from "./userToRole.entity";
import { AgendamentoEntity } from "./agendamento.entity";
import { AuditoriaEntity } from "./auditoria.entity";
import { AnamneseEntity } from "./anamnese.entity";
import { CondutaEntity } from "./conduta.entity";
import { ChamadosEntity } from "./chamados.entity";
import { AltaMedicaEntity } from "./altaMedica.entity";
import { TriagemEntity } from "./triagem.entity";
import { ExamesEntity } from "./exames.entity";
import { EvolucaoMedicaEntity } from "./evolucaoMedica.entity";
import { AdministracaoCondutaEntity } from "./administracaoConduta.entity";

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
    @AutoMap(() => [CondutaEntity])
    Condutas?: CondutaEntity[];
    @AutoMap(() => [ChamadosEntity])
    Chamados?: ChamadosEntity[];
    @AutoMap(() => [AltaMedicaEntity])
    AltasMedicas?: AltaMedicaEntity[];
    @AutoMap(() => [TriagemEntity])
    TriagensRealizadas?: TriagemEntity[];
    @AutoMap(() => [ExamesEntity])
    ExamesRealizados?: ExamesEntity[];
    @AutoMap(() => [EvolucaoMedicaEntity])
    EvolucoesMedicas?: EvolucaoMedicaEntity[];
    @AutoMap(() => [AdministracaoCondutaEntity])
    AdministracoesCondutas?: AdministracaoCondutaEntity[];
}
