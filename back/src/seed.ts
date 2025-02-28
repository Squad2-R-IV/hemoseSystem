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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });