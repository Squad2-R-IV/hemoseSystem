import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const roles = [
        { name: "gestor", description: "Gestor" },
        { name: "recepcionista", description: "Recepcionista" },
        { name: "semRole", description: "Sem Role" },
        { name: "medico", description: "Médico" },
        { name: "fisioterapeuta", description: "Fisioterapeuta" },
        { name: "enfermeiro", description: "Enfermeiro" },
        { name: "admin", description: "Administrador" },
        { name: "nutricionista", description: "Nutricionista" },
    ];

    const permissions = [
        { name: "pacientes_create", description: "Permissão para criar pacientes" },
        { name: "pacientes_read", description: "Permissão para ler pacientes" },
        { name: "pacientes_update", description: "Permissão para atualizar pacientes" },
        { name: "pacientes_delete", description: "Permissão para deletar pacientes" },
        { name: "historicos_create", description: "Permissão para criar históricos" },
        { name: "historicos_read", description: "Permissão para ler históricos" },
        { name: "historicos_update", description: "Permissão para atualizar históricos" },
        { name: "historicos_delete", description: "Permissão para deletar históricos" },
        { name: "agendamento_create", description: "Permissão para criar agendamento" },
        { name: "agendamento_read", description: "Permissão para ler agendamento" },
        { name: "agendamento_update", description: "Permissão para atualizar agendamento" },
        { name: "agendamento_delete", description: "Permissão para deletar agendamento" },
        { name: "paciente_create", description: "Permissão para criar paciente" },
        { name: "paciente_read", description: "Permissão para ler paciente" },
        { name: "paciente_update", description: "Permissão para atualizar paciente" },
        { name: "paciente_delete", description: "Permissão para deletar paciente" },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }

    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { name: permission.name },
            update: {},
            create: permission,
        });
    }

    const adminRole = await prisma.role.findUnique({ where: { name: "admin" } });
    const gestorRole = await prisma.role.findUnique({ where: { name: "gestor" } });
    const recepcionistaRole = await prisma.role.findUnique({ where: { name: "recepcionista" } });
    const semRole = await prisma.role.findUnique({ where: { name: "semRole" } });

    const pacientesReadPermission = await prisma.permission.findUnique({ where: { name: "pacientes_read" } });
    const pacientesCreatePermission = await prisma.permission.findUnique({ where: { name: "pacientes_create" } });
    const pacientesUpdatePermission = await prisma.permission.findUnique({ where: { name: "pacientes_update" } });
    const pacientesDeletePermission = await prisma.permission.findUnique({ where: { name: "pacientes_delete" } });

    const historicosReadPermission = await prisma.permission.findUnique({ where: { name: "historicos_read" } });
    const historicosCreatePermission = await prisma.permission.findUnique({ where: { name: "historicos_create" } });
    const historicosUpdatePermission = await prisma.permission.findUnique({ where: { name: "historicos_update" } });
    const historicosDeletePermission = await prisma.permission.findUnique({ where: { name: "historicos_delete" } });

    const agendamentoReadPermission = await prisma.permission.findUnique({ where: { name: "agendamento_read" } });
    const agendamentoCreatePermission = await prisma.permission.findUnique({ where: { name: "agendamento_create" } });
    const agendamentoUpdatePermission = await prisma.permission.findUnique({ where: { name: "agendamento_update" } });
    const agendamentoDeletePermission = await prisma.permission.findUnique({ where: { name: "agendamento_delete" } });

    const pacienteReadPermission = await prisma.permission.findUnique({ where: { name: "paciente_read" } });
    const pacienteCreatePermission = await prisma.permission.findUnique({ where: { name: "paciente_create" } });
    const pacienteUpdatePermission = await prisma.permission.findUnique({ where: { name: "paciente_update" } });
    const pacienteDeletePermission = await prisma.permission.findUnique({ where: { name: "paciente_delete" } });

    if (adminRole && pacientesReadPermission) {
        await prisma.roleToPermission.upsert({
            where: { roleId_permissionId: { roleId: adminRole.id, permissionId: pacientesReadPermission.id } },
            update: {},
            create: { roleId: adminRole.id, permissionId: pacientesReadPermission.id },
        });
    }

    if (gestorRole && pacientesCreatePermission) {
        await prisma.roleToPermission.upsert({
            where: { roleId_permissionId: { roleId: gestorRole.id, permissionId: pacientesCreatePermission.id } },
            update: {},
            create: { roleId: gestorRole.id, permissionId: pacientesCreatePermission.id },
        });
    }

    if (recepcionistaRole && pacientesUpdatePermission) {
        await prisma.roleToPermission.upsert({
            where: { roleId_permissionId: { roleId: recepcionistaRole.id, permissionId: pacientesUpdatePermission.id } },
            update: {},
            create: { roleId: recepcionistaRole.id, permissionId: pacientesUpdatePermission.id },
        });
    }

    if (adminRole && pacientesDeletePermission) {
        await prisma.roleToPermission.upsert({
            where: { roleId_permissionId: { roleId: adminRole.id, permissionId: pacientesDeletePermission.id } },
            update: {},
            create: { roleId: adminRole.id, permissionId: pacientesDeletePermission.id },
        });
    }

    // Adicionar permissões de leitura para todas as roles em histórico
    for (const role of [adminRole, gestorRole, recepcionistaRole, semRole]) {
        if (role && historicosReadPermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: historicosReadPermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: historicosReadPermission.id },
            });
        }
    }

    // Adicionar permissões de criar, atualizar e deletar históricos para gestor, admin e recepcionista
    for (const role of [adminRole, gestorRole, recepcionistaRole]) {
        if (role && historicosCreatePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: historicosCreatePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: historicosCreatePermission.id },
            });
        }
        if (role && historicosUpdatePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: historicosUpdatePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: historicosUpdatePermission.id },
            });
        }
        if (role && historicosDeletePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: historicosDeletePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: historicosDeletePermission.id },
            });
        }
    }


    // Adicionar permissões de leitura para todas as roles em agendamento
    for (const role of [adminRole, gestorRole, recepcionistaRole, semRole]) {
        if (role && agendamentoReadPermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: agendamentoReadPermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: agendamentoReadPermission.id },
            });
        }
    }

    // Adicionar permissões de criar, atualizar e deletar agendamento para gestor, admin e recepcionista
    for (const role of [adminRole, gestorRole, recepcionistaRole]) {
        if (role && agendamentoCreatePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: agendamentoCreatePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: agendamentoCreatePermission.id },
            });
        }
        if (role && agendamentoUpdatePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: agendamentoUpdatePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: agendamentoUpdatePermission.id },
            });
        }
        if (role && agendamentoDeletePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: agendamentoDeletePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: agendamentoDeletePermission.id },
            });
        }
    }


    // Adicionar permissões de leitura para todas as roles em paciente
    for (const role of [adminRole, gestorRole, recepcionistaRole, semRole]) {
        if (role && pacienteReadPermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: pacienteReadPermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: pacienteReadPermission.id },
            });
        }
    }

    // Adicionar permissões de criar, atualizar e deletar paciente para gestor, admin e recepcionista
    for (const role of [adminRole, gestorRole, recepcionistaRole]) {
        if (role && pacienteCreatePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: pacienteCreatePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: pacienteCreatePermission.id },
            });
        }
        if (role && pacienteUpdatePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: pacienteUpdatePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: pacienteUpdatePermission.id },
            });
        }
        if (role && pacienteDeletePermission) {
            await prisma.roleToPermission.upsert({
                where: { roleId_permissionId: { roleId: role.id, permissionId: pacienteDeletePermission.id } },
                update: {},
                create: { roleId: role.id, permissionId: pacienteDeletePermission.id },
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });