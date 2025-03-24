-- CreateTable
CREATE TABLE `Agendamento` (
    `id_agendamento` INTEGER NOT NULL AUTO_INCREMENT,
    `id_paciente` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `data_agendamento` DATETIME(3) NOT NULL,
    `hora_agendamento` DATETIME(3) NOT NULL,
    `tipo_agendamento` ENUM('Consulta', 'Exame', 'Procedimento') NOT NULL,
    `status_agendamento` ENUM('Agendado', 'Confirmado', 'Realizado', 'Cancelado', 'Reagendado') NOT NULL,
    `observacoes` VARCHAR(191) NULL,

    PRIMARY KEY (`id_agendamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_id_agendamento_fkey` FOREIGN KEY (`id_agendamento`) REFERENCES `Agendamento`(`id_agendamento`) ON DELETE RESTRICT ON UPDATE CASCADE;
