import { AgendamentoEntity } from "../../models/agendamento.entity";
import { IGenericService } from "./IGenericService";

export interface IAgendamentoService extends IGenericService<AgendamentoEntity> {
    getAgendamentosComConsultasAtivas(): Promise<AgendamentoEntity[]>;
    getAgendamentosByDate(date: Date): Promise<AgendamentoEntity[]>;
}
