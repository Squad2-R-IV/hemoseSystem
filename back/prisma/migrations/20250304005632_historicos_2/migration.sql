-- CreateTable
CREATE TABLE `Historico` (
    `id_historico` INTEGER NOT NULL AUTO_INCREMENT,
    `id_agendamento` INTEGER NOT NULL,
    `procedimento` ENUM('PROCEDIMENTO_A', 'PROCEDIMENTO_B') NOT NULL,
    `dt_entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_saida` DATETIME(3) NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'A',
    `observacoes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_historico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
