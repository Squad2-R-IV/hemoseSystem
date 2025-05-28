
import { Agendamento } from "@prisma/client";
import { IGenericService } from "./IGenericService";

export interface IAgendamentoService extends IGenericService<Agendamento> {
    getAgendamentosComConsultasAtivas(): Promise<Agendamento[]>;
    getAgendamentosNaEnfermaria(): Promise<Agendamento[]>;
    getAgendamentosByDate(date: Date): Promise<Agendamento[]>;
}
