
export class CreateEvolucaoMedicaDto {
  
 id_consulta!: number;
 id_funcionario!: string;
  dt_evolucao!: Date;
  queixas!: string | null;
  exame_fisico!: string | null;
  conduta!: string;
  observacoes!: string | null;	
}


/*

model EvolucaoMedica {
  id   Int       @id @default(autoincrement())
  id_consulta   Int
  id_funcionario String
  dt_evolucao   DateTime  @default(now()) @db.DateTime(6)
  queixas      String?   @db.VarChar(500)
  exame_fisico String?   @db.VarChar(500)
  conduta      String    @db.VarChar(500)
  observacoes   String?   @db.VarChar(5000)

  Consulta      Consulta   @relation(fields: [id_consulta], references: [id])
  Usuario       User    @relation(fields: [id_funcionario], references: [id])
  @@map("evolucao_medica")
}*/