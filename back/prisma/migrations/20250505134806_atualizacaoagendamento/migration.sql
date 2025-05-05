/*
  Warnings:

  - You are about to drop the column `data_hora_agendamento` on the `agendamento` table. All the data in the column will be lost.
  - Added the required column `dt_agendamento` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dt_hora_agendamento` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agendamento` DROP COLUMN `data_hora_agendamento`,
    ADD COLUMN `dt_agendamento` DATE NOT NULL,
    ADD COLUMN `dt_chegada` DATETIME(3) NULL,
    ADD COLUMN `dt_hora_agendamento` INTEGER NOT NULL;
