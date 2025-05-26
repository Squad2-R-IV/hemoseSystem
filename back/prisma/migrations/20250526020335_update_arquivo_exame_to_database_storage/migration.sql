-- CreateTable
CREATE TABLE `arquivo_exame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_exame` INTEGER NOT NULL,
    `nome_arquivo` VARCHAR(191) NOT NULL,
    `tipo_arquivo` VARCHAR(191) NOT NULL DEFAULT 'application/pdf',
    `tamanho` INTEGER NOT NULL,
    `conteudo` LONGBLOB NOT NULL,
    `dt_upload` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_consulta` INTEGER NOT NULL,
    `id_paciente` INTEGER NOT NULL,
    `tipo_do_exame` VARCHAR(191) NOT NULL,
    `resultado` VARCHAR(191) NULL,
    `dt_exame` DATE NOT NULL,
    `profissional_responsavel` VARCHAR(191) NOT NULL,
    `crm_profissional_responsavel` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivo_exame` ADD CONSTRAINT `arquivo_exame_id_exame_fkey` FOREIGN KEY (`id_exame`) REFERENCES `exame`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame` ADD CONSTRAINT `exame_id_paciente_fkey` FOREIGN KEY (`id_paciente`) REFERENCES `paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
