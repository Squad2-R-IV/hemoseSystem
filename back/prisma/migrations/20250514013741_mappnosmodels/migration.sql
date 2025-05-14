-- CreateTable
CREATE TABLE `anamnese` (
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

    UNIQUE INDEX `anamnese_id_consulta_key`(`id_consulta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agendamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_paciente` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `dt_agendamento` DATE NOT NULL,
    `dt_hora_agendamento` INTEGER NOT NULL,
    `tipo_agendamento` ENUM('Consulta', 'Exame', 'Procedimento') NOT NULL,
    `status_agendamento` ENUM('Agendado', 'Confirmado', 'Realizado', 'Cancelado', 'Reagendado') NOT NULL,
    `observacoes` VARCHAR(191) NULL,
    `dt_chegada` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auditoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` VARCHAR(191) NOT NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `acao` VARCHAR(191) NOT NULL,
    `tabela` VARCHAR(191) NOT NULL,
    `dados_anteriores` JSON NULL,
    `dados_novos` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conduta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_consulta` INTEGER NOT NULL,
    `id_funcionario` VARCHAR(191) NOT NULL,
    `dt_conduta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `conduta` VARCHAR(5000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consulta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_agendamento` INTEGER NOT NULL,
    `procedimento` ENUM('PROCEDIMENTO_A', 'PROCEDIMENTO_B') NOT NULL,
    `dt_entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_saida` DATETIME(3) NULL,
    `status` ENUM('REALIZADA', 'AGUARDANDO', 'EM_ATENDIMENTO', 'CHAMADO', 'CANCELADO') NOT NULL DEFAULT 'AGUARDANDO',
    `observacoes` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `consulta_id_agendamento_key`(`id_agendamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paciente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_paciente` VARCHAR(100) NOT NULL,
    `dt_nascimento` DATE NOT NULL,
    `sexo` ENUM('M', 'F', 'O') NOT NULL,
    `estado_civil` ENUM('S', 'C', 'D', 'V') NOT NULL,
    `endereco` VARCHAR(50) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `cpf_acompanhante` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `paciente_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_to_permission` (
    `roleId` VARCHAR(191) NOT NULL,
    `permissionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'A',
    `especialidade` VARCHAR(191) NOT NULL DEFAULT '',
    `conselho` VARCHAR(191) NOT NULL DEFAULT '',
    `registro` VARCHAR(191) NOT NULL DEFAULT '',
    `refreshToken` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_to_role` (
    `userId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anamnese` ADD CONSTRAINT `anamnese_id_consulta_fkey` FOREIGN KEY (`id_consulta`) REFERENCES `consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anamnese` ADD CONSTRAINT `anamnese_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agendamento` ADD CONSTRAINT `agendamento_id_paciente_fkey` FOREIGN KEY (`id_paciente`) REFERENCES `paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agendamento` ADD CONSTRAINT `agendamento_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auditoria` ADD CONSTRAINT `auditoria_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conduta` ADD CONSTRAINT `conduta_id_consulta_fkey` FOREIGN KEY (`id_consulta`) REFERENCES `consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conduta` ADD CONSTRAINT `conduta_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_id_agendamento_fkey` FOREIGN KEY (`id_agendamento`) REFERENCES `agendamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_to_permission` ADD CONSTRAINT `role_to_permission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_to_permission` ADD CONSTRAINT `role_to_permission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_to_role` ADD CONSTRAINT `user_to_role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_to_role` ADD CONSTRAINT `user_to_role_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
