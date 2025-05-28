-- CreateTable
CREATE TABLE `alta_medica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_consulta` INTEGER NOT NULL,
    `id_medico` VARCHAR(191) NOT NULL,
    `dt_alta` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `tipo_alta` ENUM('OBITO', 'CURA', 'TRANSFERENCIA', 'ALTA', 'EVASAO', 'OUTRO') NOT NULL,
    `observacoes` TEXT NULL,

    UNIQUE INDEX `alta_medica_id_consulta_key`(`id_consulta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alta_medica` ADD CONSTRAINT `alta_medica_id_consulta_fkey` FOREIGN KEY (`id_consulta`) REFERENCES `consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alta_medica` ADD CONSTRAINT `alta_medica_id_medico_fkey` FOREIGN KEY (`id_medico`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
