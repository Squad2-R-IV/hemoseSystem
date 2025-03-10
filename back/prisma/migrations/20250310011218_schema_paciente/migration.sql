-- CreateTable
CREATE TABLE `Paciente` (
    `id_paciente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_paciente` VARCHAR(100) NOT NULL,
    `dt_nascimento` DATETIME(3) NOT NULL,
    `idade` INTEGER NOT NULL,
    `sexo` VARCHAR(20) NOT NULL,
    `estado_civil` VARCHAR(20) NOT NULL,
    `endereco` VARCHAR(50) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `cpf_acompanhante` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `Paciente_cpf_key`(`cpf`),
    UNIQUE INDEX `Paciente_cpf_acompanhante_key`(`cpf_acompanhante`),
    PRIMARY KEY (`id_paciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_paciente_fkey` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente`(`id_paciente`) ON DELETE RESTRICT ON UPDATE CASCADE;
