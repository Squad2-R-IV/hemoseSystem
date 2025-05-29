
export class CreateEvolucaoEnfermagemDto {
  
//  id_consulta!: number;
//  id_funcionario!: string;
//   dt_evolucao!: Date;
//   queixas!: string | null;
//   exame_fisico!: string | null;
//   conduta!: string;
//   observacoes!: string | null;	

  id_consulta!: number;
  id_funcionario!: string;
  dt_evolucao!: Date;
  sinais_vitais?: string | null;
  conduta_enfermagem?: string | null;
  observacoes?: string | null;

}


/*
model EvolucaoEnfermagem {
  id Int      @id @default(autoincrement())
  id_consulta               Int
  id_funcionario            String
  dt_evolucao               DateTime @default(now()) @db.DateTime(6)
  sinais_vitais             String?  @db.VarChar(5000)
  conduta_enfermagem        String?  @db.VarChar(5000)
  observacoes               String?  @db.VarChar(5000)

  Consulta                  Consulta @relation(fields: [id_consulta], references: [id])
  Funcionario               User     @relation(fields: [id_funcionario], references: [id])

  @@map("evolucao_enfermagem")
}

}*/