-- CreateTable
CREATE TABLE `evolucao_medica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_consulta` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `dt_evolucao` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `queixas` VARCHAR(500) NULL,
    `exame_fisico` VARCHAR(500) NULL,
    `conduta` VARCHAR(500) NOT NULL,
    `observacoes` VARCHAR(5000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `evolucao_medica` ADD CONSTRAINT `evolucao_medica_id_consulta_fkey` FOREIGN KEY (`id_consulta`) REFERENCES `consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolucao_medica` ADD CONSTRAINT `evolucao_medica_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
