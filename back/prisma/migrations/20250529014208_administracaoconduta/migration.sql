-- CreateTable
CREATE TABLE `administracao_conduta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_conduta` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `dt_administracao` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `observacoes` VARCHAR(5000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `administracao_conduta` ADD CONSTRAINT `administracao_conduta_id_conduta_fkey` FOREIGN KEY (`id_conduta`) REFERENCES `conduta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administracao_conduta` ADD CONSTRAINT `administracao_conduta_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
