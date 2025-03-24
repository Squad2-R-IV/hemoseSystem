-- CreateTable
CREATE TABLE `Anamnese` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_consulta` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `cid` VARCHAR(10) NOT NULL,
    `queixa_principal` VARCHAR(1000) NULL,
    `historia_doenca_atual` VARCHAR(1000) NULL,
    `antecedentes_pessoais` VARCHAR(1000) NULL,
    `antecedentes_familiares` VARCHAR(1000) NULL,
    `habitos_vida` VARCHAR(1000) NULL,
    `medicamentos_em_uso` VARCHAR(1000) NULL,
    `alergias` VARCHAR(1000) NULL,
    `cirurgias_previas` VARCHAR(1000) NULL,
    `observacoes` VARCHAR(1000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anamnese` ADD CONSTRAINT `Anamnese_id_consulta_fkey` FOREIGN KEY (`id_consulta`) REFERENCES `Consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anamnese` ADD CONSTRAINT `Anamnese_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
