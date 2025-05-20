
import { Agendamento } from "@prisma/client";
import { IGenericService } from "./IGenericService";

export interface IAgendamentoService extends IGenericService<Agendamento> {
    getAgendamentosComConsultasAtivas(): Promise<Agendamento[]>;
    getAgendamentosByDate(date: Date): Promise<Agendamento[]>;
}
