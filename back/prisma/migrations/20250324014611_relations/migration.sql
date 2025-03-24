/*
  Warnings:

  - A unique constraint covering the columns `[id_consulta]` on the table `Anamnese` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_agendamento]` on the table `Consulta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Anamnese_id_consulta_key` ON `Anamnese`(`id_consulta`);

-- CreateIndex
CREATE UNIQUE INDEX `Consulta_id_agendamento_key` ON `Consulta`(`id_agendamento`);
