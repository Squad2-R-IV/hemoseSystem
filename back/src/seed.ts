import {
  PrismaClient,
  Role,
  Permission,
  StatusAgendamentoEnum,
  tipo_procedimento_enum,
  TipoAgendamentoEnum,
  status_consulta_enum,
  Sexo,
  EstadoCivil,
} from "@prisma/client";
import bcrypt from "bcrypt";

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
    {
      name: "pacientes_update",
      description: "Permissão para atualizar pacientes",
    },
    {
      name: "pacientes_delete",
      description: "Permissão para deletar pacientes",
    },
    {
      name: "consultas_create",
      description: "Permissão para criar históricos",
    },
    { name: "consultas_read", description: "Permissão para ler históricos" },
    {
      name: "consultas_update",
      description: "Permissão para atualizar históricos",
    },
    {
      name: "consultas_delete",
      description: "Permissão para deletar históricos",
    },
    {
      name: "agendamento_create",
      description: "Permissão para criar agendamento",
    },
    { name: "agendamento_read", description: "Permissão para ler agendamento" },
    {
      name: "agendamento_update",
      description: "Permissão para atualizar agendamento",
    },
    {
      name: "agendamento_delete",
      description: "Permissão para deletar agendamento",
    },
    { name: "paciente_create", description: "Permissão para criar paciente" },
    { name: "paciente_read", description: "Permissão para ler paciente" },
    {
      name: "paciente_update",
      description: "Permissão para atualizar paciente",
    },
    { name: "paciente_delete", description: "Permissão para deletar paciente" },
    { name: "anamnese_create", description: "Permissão para criar anamnese" },
    { name: "anamnese_read", description: "Permissão para ler anamnese" },
    {
      name: "anamnese_update",
      description: "Permissão para atualizar anamnese",
    },
    { name: "anamnese_delete", description: "Permissão para deletar anamnese" },
    { name: "exame_create", description: "Permissão para criar exame" },
    { name: "exame_read", description: "Permissão para ler exame" },
    { name: "exame_update", description: "Permissão para atualizar exame" },
    { name: "exame_delete", description: "Permissão para deletar exame" },
    {
      name: "prescricao_create",
      description: "Permissão para criar prescrição",
    },
    { name: "prescricao_read", description: "Permissão para ler prescrição" },
    {
      name: "prescricao_update",
      description: "Permissão para atualizar prescrição",
    },
    {
      name: "prescricao_delete",
      description: "Permissão para deletar prescrição",
    },
    { name: "conduta_create", description: "Permissão para criar conduta" },
    { name: "conduta_read", description: "Permissão para ler conduta" },
    { name: "conduta_update", description: "Permissão para atualizar conduta" },
    { name: "conduta_delete", description: "Permissão para deletar conduta" },
  ];

  // Upsert roles (only creates if not exists)
  await Promise.all(
    roles.map((role) =>
      prisma.role.upsert({
        where: { name: role.name },
        update: {}, // No updates, just ensure it exists
        create: role,
      })
    )
  );

  // Upsert permissions (only creates if not exists)
  await Promise.all(
    permissions.map((permission) =>
      prisma.permission.upsert({
        where: { name: permission.name },
        update: {}, // No updates, just ensure it exists
        create: permission,
      })
    )
  );

  const roleNames = ["admin", "gestor", "recepcionista", "semRole", "medico"];
  const rolesMap: { [key: string]: Role } = await prisma.role
    .findMany({
      where: { name: { in: roleNames } },
    })
    .then((roles) =>
      roles.reduce((acc, role) => ({ ...acc, [role.name]: role }), {})
    );

  const permissionNames = [
    "pacientes_read",
    "pacientes_create",
    "pacientes_update",
    "pacientes_delete",
    "consultas_read",
    "consultas_create",
    "consultas_update",
    "consultas_delete",
    "agendamento_read",
    "agendamento_create",
    "agendamento_update",
    "agendamento_delete",
    "paciente_read",
    "paciente_create",
    "paciente_update",
    "paciente_delete",
    "anamnese_create",
    "anamnese_read",
    "anamnese_update",
    "anamnese_delete",
    "exame_create",
    "exame_read",
    "exame_update",
    "exame_delete",
    "prescricao_create",
    "prescricao_read",
    "prescricao_update",
    "prescricao_delete",
    "conduta_create",
    "conduta_read",
    "conduta_update",
    "conduta_delete",
  ];
  const permissionsMap: { [key: string]: Permission } = await prisma.permission
    .findMany({
      where: { name: { in: permissionNames } },
    })
    .then((permissions) =>
      permissions.reduce(
        (acc, permission) => ({ ...acc, [permission.name]: permission }),
        {}
      )
    );

  const rolePermissions = [
    {
      role: "admin",
      permissions: [
        "pacientes_read",
        "pacientes_delete",
        "consultas_read",
        "consultas_create",
        "consultas_update",
        "consultas_delete",
        "agendamento_read",
        "agendamento_create",
        "agendamento_update",
        "agendamento_delete",
        "paciente_read",
        "paciente_create",
        "paciente_update",
        "paciente_delete",
        "anamnese_read",
        "exame_create",
        "exame_read",
        "exame_update",
        "exame_delete",
        "conduta_create",
        "conduta_read",
        "conduta_update",
        "conduta_delete",
        "prescricao_create",
        "prescricao_read",
        "prescricao_update",
        "prescricao_delete",
      ],
    },
    {
      role: "gestor",
      permissions: [
        "pacientes_create",
        "consultas_read",
        "consultas_create",
        "agendamento_read",
        "agendamento_create",
        "paciente_read",
        "paciente_create",
        "anamnese_read",
        "exame_create",
        "exame_read",
        "conduta_create",
        "conduta_read",
        "prescricao_create",
        "prescricao_read",
      ],
    },
    {
      role: "recepcionista",
      permissions: [
        "pacientes_update",
        "consultas_read",
        "consultas_create",
        "consultas_update",
        "agendamento_read",
        "agendamento_create",
        "agendamento_update",
        "agendamento_delete",
        "paciente_read",
        "paciente_create",
        "paciente_update",
      ],
    },
    {
      role: "semRole",
      permissions: [
        "consultas_read",
        "agendamento_read",
        "paciente_read",
        "anamnese_read",
      ],
    },
    {
      role: "medico",
      permissions: [
        "anamnese_create",
        "anamnese_read",
        "consultas_read",
        "agendamento_read",
        "paciente_read",
        "prescricao_create",
        "prescricao_read",
        "conduta_create",
        "conduta_read",
      ],
    },
  ];

  // Upsert role-to-permission relationships (only creates if not exists)
  await Promise.all(
    rolePermissions.flatMap(({ role, permissions }) =>
      permissions.map((permission) =>
        prisma.roleToPermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: rolesMap[role].id,
              permissionId: permissionsMap[permission].id,
            },
          },
          update: {}, // No updates, just ensure it exists
          create: {
            roleId: rolesMap[role].id,
            permissionId: permissionsMap[permission].id,
          },
        })
      )
    )
  );

  const users = roleNames.map((role) => ({
    name: role,
    email: `${role}@email.com`,
    password: bcrypt.hashSync("Password@123", 10),
    cpf: `${role}12345678900`,
    contato: "123456789",
    roles: {
      create: [{ role: { connect: { id: rolesMap[role].id } } }],
    },
  }));

  // Upsert users (only creates if email doesn't exist)
  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email }, // Use email as the unique identifier
        update: {}, // No updates, just ensure it exists (you can add updates if needed)
        create: user,
      })
    )
  );

  // Fetch the user with the role "medico"
  const medicoUser = await prisma.user.findUnique({
    where: { email: "medico@email.com" },
  });

  if (!medicoUser) {
    throw new Error("Medico user not found");
  }
  
  // Seed patients
  const patients = [
    {
      id: 1,
      nome_paciente: "Paciente 1",
      dt_nascimento: new Date("1990-01-01"),
      sexo: Sexo.M, // Masculino
      estado_civil: EstadoCivil.S, // Solteiro(a)
      endereco: "Endereço 1",
      cpf: "12345678901",
      cpf_acompanhante: "10987654321",
    },
    {
      id: 2,
      nome_paciente: "Paciente 2",
      dt_nascimento: new Date("1985-05-15"),
      sexo: Sexo.F, // Feminino
      estado_civil: EstadoCivil.C, // Casado(a)
      endereco: "Endereço 2",
      cpf: "23456789012",
      cpf_acompanhante: "21098765432",
    },
    {
      id: 3,
      nome_paciente: "Paciente 3",
      dt_nascimento: new Date("2000-12-20"),
      sexo: Sexo.M, // Masculino
      estado_civil: EstadoCivil.S, // Solteiro(a)
      endereco: "Endereço 3",
      cpf: "34567890123",
      cpf_acompanhante: "32109876543",
    },
  ];
  
  // Upsert patients (only creates if not exists)
  await Promise.all(
    patients.map((patient) =>
      prisma.paciente.upsert({
        where: { cpf: patient.cpf },
        update: {}, // No updates, just ensure it exists
        create: patient,
      })
    )
  );
  
  // Seed appointments
  const appointments = [
    {
      id: 1,
      id_paciente: 1,
      id_funcionario: medicoUser.id,
      dt_agendamento: new Date("2023-10-01"),
      dt_hora_agendamento: 1000, // Representing 10:00 AM as 1000
      tipo_agendamento: TipoAgendamentoEnum.Consulta,
      status_agendamento: StatusAgendamentoEnum.Realizado,
      observacoes: "Primeira consulta",
      dt_chegada: new Date("2023-10-01T09:50:00Z"),
    },
    {
      id: 2,
      id_paciente: 2,
      id_funcionario: medicoUser.id,
      dt_agendamento: new Date("2023-10-02"),
      dt_hora_agendamento: 1100, // Representing 11:00 AM as 1100
      tipo_agendamento: TipoAgendamentoEnum.Exame,
      status_agendamento: StatusAgendamentoEnum.Confirmado,
      observacoes: "Exame de rotina",
      dt_chegada: new Date("2023-10-02T10:50:00Z"),
    },
    {
      id: 3,
      id_paciente: 3,
      id_funcionario: medicoUser.id,
      dt_agendamento: new Date("2023-10-03"),
      dt_hora_agendamento: 1200, // Representing 12:00 PM as 1200
      tipo_agendamento: TipoAgendamentoEnum.Procedimento,
      status_agendamento: StatusAgendamentoEnum.Agendado,
      observacoes: "Procedimento cirúrgico",
      dt_chegada: null,
    },
    {
      id: 4,
      id_paciente: 1,
      id_funcionario: medicoUser.id,
      dt_agendamento: new Date("2023-10-04"),
      dt_hora_agendamento: 1400, // Representing 2:00 PM as 1400
      tipo_agendamento: TipoAgendamentoEnum.Consulta,
      status_agendamento: StatusAgendamentoEnum.Confirmado,
      observacoes: "Consulta de acompanhamento",
      dt_chegada: new Date("2023-10-04T13:50:00Z"),
    },
    {
      id: 5,
      id_paciente: 2,
      id_funcionario: medicoUser.id,
      dt_agendamento: new Date("2023-10-05"),
      dt_hora_agendamento: 1600, // Representing 4:00 PM as 1600
      tipo_agendamento: TipoAgendamentoEnum.Exame,
      status_agendamento: StatusAgendamentoEnum.Cancelado,
      observacoes: "Exame cancelado",
      dt_chegada: null,
    },
  ];

  await Promise.all(
    appointments.map((appointment) =>
      prisma.agendamento.upsert({
        where: { id: appointment.id },
        update: {},
        create: appointment,
      })
    )
  );

  // Seed histories with updated model and more data
  const histories = [
    {
      id: 1,
      id_agendamento: 1,
      procedimento: tipo_procedimento_enum.PROCEDIMENTO_A,
      dt_entrada: new Date("2023-10-01T10:00:00Z"),
      dt_saida: new Date("2023-10-01T11:00:00Z"),
      status: status_consulta_enum.REALIZADA,
      observacoes: "Histórico do procedimento A",
    },
    {
      id: 2,
      id_agendamento: 2,
      procedimento: tipo_procedimento_enum.PROCEDIMENTO_B,
      dt_entrada: new Date("2023-10-02T11:00:00Z"),
      dt_saida: new Date("2023-10-02T12:00:00Z"),
      status: status_consulta_enum.REALIZADA,
      observacoes: "Histórico do procedimento B",
    },
    {
      id: 3,
      id_agendamento: 3,
      procedimento: tipo_procedimento_enum.PROCEDIMENTO_A,
      dt_entrada: new Date("2023-10-03T12:00:00Z"),
      dt_saida: new Date("2023-10-03T13:00:00Z"),
      status: status_consulta_enum.EM_ATENDIMENTO,
      observacoes: "Histórico do procedimento A",
    },
    {
      id: 4,
      id_agendamento: 4,
      procedimento: tipo_procedimento_enum.PROCEDIMENTO_B,
      dt_entrada: new Date("2023-10-04T14:00:00Z"),
      dt_saida: new Date("2023-10-04T15:00:00Z"),
      status: status_consulta_enum.AGUARDANDO,
      observacoes: "Histórico do procedimento B",
    },
    {
      id: 5,
      id_agendamento: 5,
      procedimento: tipo_procedimento_enum.PROCEDIMENTO_B,
      dt_entrada: new Date("2023-10-05T16:00:00Z"),
      dt_saida: new Date("2023-10-05T17:00:00Z"),
      status: status_consulta_enum.AGUARDANDO,
      observacoes: "Histórico do procedimento C",
    },
  ];

  await Promise.all(
    histories.map((history) =>
      prisma.consulta.upsert({
        where: { id: history.id },
        update: {},
        create: history,
      })
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
