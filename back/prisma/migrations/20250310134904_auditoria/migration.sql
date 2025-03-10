-- CreateTable
CREATE TABLE `Auditoria` (
    `id_auditoria` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` VARCHAR(191) NOT NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `acao` VARCHAR(191) NOT NULL,
    `tabela` VARCHAR(191) NOT NULL,
    `dados_anteriores` VARCHAR(191) NULL,
    `dados_novos` VARCHAR(191) NULL,

    PRIMARY KEY (`id_auditoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auditoria` ADD CONSTRAINT `Auditoria_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
