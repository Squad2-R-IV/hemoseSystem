import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const roles = [
        { name: "gestor", description: "Gestor" },
        { name: "medico", description: "Médico" },
        { name: "fisioterapeuta", description: "Fisioterapeuta" },
        { name: "enfermeiro", description: "Enfermeiro" },
        { name: "admin", description: "Administrador" },
        { name: "nutricionista", description: "Nutricionista" },
    ];

    const permissions = [
        { name: "delete_user", description: "Permissão para deletar usuários" },
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
    const deleteUserPermission = await prisma.permission.findUnique({ where: { name: "delete_user" } });

    if (adminRole && deleteUserPermission) {
        await prisma.roleToPermission.upsert({
            where: { roleId_permissionId: { roleId: adminRole.id, permissionId: deleteUserPermission.id } },
            update: {},
            create: { roleId: adminRole.id, permissionId: deleteUserPermission.id },
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
