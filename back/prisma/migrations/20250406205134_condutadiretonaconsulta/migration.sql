-- CreateTable
CREATE TABLE `Conduta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_consulta` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `dt_conduta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `conduta` VARCHAR(5000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conduta` ADD CONSTRAINT `Conduta_id_consulta_fkey` FOREIGN KEY (`id_consulta`) REFERENCES `Consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conduta` ADD CONSTRAINT `Conduta_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
