/*
  Warnings:

  - You are about to drop the `roletopermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usertorole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_id_funcionario_fkey`;

-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_id_paciente_fkey`;

-- DropForeignKey
ALTER TABLE `anamnese` DROP FOREIGN KEY `Anamnese_id_consulta_fkey`;

-- DropForeignKey
ALTER TABLE `anamnese` DROP FOREIGN KEY `Anamnese_id_funcionario_fkey`;

-- DropForeignKey
ALTER TABLE `auditoria` DROP FOREIGN KEY `Auditoria_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `conduta` DROP FOREIGN KEY `Conduta_id_consulta_fkey`;

-- DropForeignKey
ALTER TABLE `conduta` DROP FOREIGN KEY `Conduta_id_funcionario_fkey`;

-- DropForeignKey
ALTER TABLE `consulta` DROP FOREIGN KEY `Consulta_id_agendamento_fkey`;

-- DropForeignKey
ALTER TABLE `roletopermission` DROP FOREIGN KEY `RoleToPermission_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `roletopermission` DROP FOREIGN KEY `RoleToPermission_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `usertorole` DROP FOREIGN KEY `UserToRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `usertorole` DROP FOREIGN KEY `UserToRole_userId_fkey`;

-- DropTable
DROP TABLE `roletopermission`;

-- DropTable
DROP TABLE `usertorole`;

-- CreateTable
CREATE TABLE `role_to_permission` (
    `roleId` VARCHAR(191) NOT NULL,
    `permissionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
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

-- RenameIndex
ALTER TABLE `anamnese` RENAME INDEX `Anamnese_id_consulta_key` TO `anamnese_id_consulta_key`;

-- RenameIndex
ALTER TABLE `consulta` RENAME INDEX `Consulta_id_agendamento_key` TO `consulta_id_agendamento_key`;

-- RenameIndex
ALTER TABLE `paciente` RENAME INDEX `Paciente_cpf_key` TO `paciente_cpf_key`;

-- RenameIndex
ALTER TABLE `permission` RENAME INDEX `Permission_name_key` TO `permission_name_key`;

-- RenameIndex
ALTER TABLE `role` RENAME INDEX `Role_name_key` TO `role_name_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_cpf_key` TO `user_cpf_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
