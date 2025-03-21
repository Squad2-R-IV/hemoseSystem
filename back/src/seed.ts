import { PrismaClient, Role, Permission } from "@prisma/client";

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
        { name: "anamnese_create", description: "Permissão para criar anamnese" },
        { name: "anamnese_read", description: "Permissão para ler anamnese" },
        { name: "anamnese_update", description: "Permissão para atualizar anamnese" },
        { name: "anamnese_delete", description: "Permissão para deletar anamnese" },
        { name: "exame_create", description: "Permissão para criar exame" },
        { name: "exame_read", description: "Permissão para ler exame" },
        { name: "exame_update", description: "Permissão para atualizar exame" },
        { name: "exame_delete", description: "Permissão para deletar exame" },
    ];

    await Promise.all(
        roles.map(role => prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        }))
    );

    await Promise.all(
        permissions.map(permission => prisma.permission.upsert({
            where: { name: permission.name },
            update: {},
            create: permission,
        }))
    );

    const roleNames = ["admin", "gestor", "recepcionista", "semRole", "medico"];
    const rolesMap: { [key: string]: Role } = await prisma.role.findMany({
        where: { name: { in: roleNames } },
    }).then(roles => roles.reduce((acc, role) => ({ ...acc, [role.name]: role }), {}));

    const permissionNames = [
        "pacientes_read", "pacientes_create", "pacientes_update", "pacientes_delete",
        "historicos_read", "historicos_create", "historicos_update", "historicos_delete",
        "agendamento_read", "agendamento_create", "agendamento_update", "agendamento_delete",
        "paciente_read", "paciente_create", "paciente_update", "paciente_delete",
        "anamnese_create", "anamnese_read", "anamnese_update", "anamnese_delete",
        "exame_create", "exame_read", "exame_update", "exame_delete"
    ];
    const permissionsMap: { [key: string]: Permission } = await prisma.permission.findMany({
        where: { name: { in: permissionNames } },
    }).then(permissions => permissions.reduce((acc, permission) => ({ ...acc, [permission.name]: permission }), {}));

    const rolePermissions = [
        { role: "admin", permissions: ["pacientes_read", "pacientes_delete", "historicos_read", "historicos_create", "historicos_update", "historicos_delete", "agendamento_read", "agendamento_create", "agendamento_update", "agendamento_delete", "paciente_read", "paciente_create", "paciente_update", "paciente_delete", "anamnese_read", "exame_create", "exame_read", "exame_update", "exame_delete"] },
        { role: "gestor", permissions: ["pacientes_create", "historicos_read", "historicos_create", "historicos_update", "historicos_delete", "agendamento_read", "agendamento_create", "agendamento_update", "agendamento_delete", "paciente_read", "paciente_create", "paciente_update", "paciente_delete", "anamnese_read"] },
        { role: "recepcionista", permissions: ["pacientes_update", "historicos_read", "historicos_create", "historicos_update", "historicos_delete", "agendamento_read", "agendamento_create", "agendamento_update", "agendamento_delete", "paciente_read", "paciente_create", "paciente_update", "paciente_delete"] },
        { role: "semRole", permissions: ["historicos_read", "agendamento_read", "paciente_read", "anamnese_read"] },
        { role: "medico", permissions: ["anamnese_create", "anamnese_read"] },
    ];

    await Promise.all(
        rolePermissions.flatMap(({ role, permissions }) =>
            permissions.map(permission =>
                prisma.roleToPermission.upsert({
                    where: { roleId_permissionId: { roleId: rolesMap[role].id, permissionId: permissionsMap[permission].id } },
                    update: {},
                    create: { roleId: rolesMap[role].id, permissionId: permissionsMap[permission].id },
                })
            )
        )
    );
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });