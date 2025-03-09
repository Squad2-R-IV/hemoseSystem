import { IGenericRepository } from "./IGenericRepository";
import { Agendamento } from "@prisma/client";

export interface IAgendamentoRepository extends IGenericRepository<Agendamento> {

}