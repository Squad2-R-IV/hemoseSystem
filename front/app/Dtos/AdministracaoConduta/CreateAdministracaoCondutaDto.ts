import type { StatusAgendamentoEnum, TipoAgendamentoEnum } from "~/utils/enums/enums";

export class CreateAdministracaoCondutaDto {
    
    id_conduta!: number;
    
    id_funcionario!: string;
    
    dt_administracao!: Date;
    
    dt_hora_agendamento!: number;
    
    observacoes?: string;
}

/*
model AdministracaoConduta {
  id Int      @id @default(autoincrement())
  id_conduta               Int
  id_funcionario           String
  dt_administracao         DateTime  @default(now()) @db.DateTime(6)
  observacoes              String?   @db.VarChar(5000)

  Conduta                  Conduta @relation(fields: [id_conduta], references: [id])
  Funcionario              User @relation(fields: [id_funcionario], references: [id])

    @@map("administracao_conduta")
}
*/