-- CreateTable
CREATE TABLE `evolucao_enfermagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_consulta` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `dt_evolucao` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `sinais_vitais` VARCHAR(5000) NULL,
    `conduta_enfermagem` VARCHAR(5000) NULL,
    `observacoes` VARCHAR(5000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `evolucao_enfermagem` ADD CONSTRAINT `evolucao_enfermagem_id_consulta_fkey` FOREIGN KEY (`id_consulta`) REFERENCES `consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolucao_enfermagem` ADD CONSTRAINT `evolucao_enfermagem_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
