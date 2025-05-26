# API Services - Estrutura Modular

A API do SIAHME foi modularizada para melhor organização e manutenibilidade. Cada domínio agora possui seu próprio arquivo de endpoints.

## Estrutura

```
services/
├── api/
│   ├── index.ts                    # Arquivo principal que combina todos os módulos
│   ├── base-api.service.ts         # Configuração base e utilitários
│   ├── user-api.service.ts         # Endpoints de usuários
│   ├── agendamento-api.service.ts  # Endpoints de agendamentos
│   ├── consulta-api.service.ts     # Endpoints de consultas
│   ├── anamnese-api.service.ts     # Endpoints de anamneses
│   ├── conduta-api.service.ts      # Endpoints de condutas
│   ├── evolucao-medica-api.service.ts  # Endpoints de evolução médica
│   └── paciente-api.service.ts     # Endpoints de pacientes
└── siahme-api.service.ts           # Arquivo legacy (compatibilidade)
```

## Módulos

### 1. Base API Service
Contém:
- Configuração do `baseQuery`
- Wrapper para tratamento de erros
- Constantes de tags da API

### 2. User API Service
Endpoints relacionados a usuários:
- Login/Logout
- CRUD de usuários
- Gestão de roles
- Busca por tipo de profissional (médicos, enfermeiros, etc.)

### 3. Agendamento API Service
Endpoints relacionados a agendamentos:
- CRUD de agendamentos
- Busca por data
- Agendamentos com consultas ativas

### 4. Consulta API Service
Endpoints relacionados a consultas:
- CRUD de consultas
- Busca detalhada com relacionamentos
- Integração com agendamentos

### 5. Anamnese API Service
Endpoints relacionados a anamneses:
- CRUD de anamneses

### 6. Conduta API Service
Endpoints relacionados a condutas:
- CRUD de condutas
- Busca por consulta

### 7. Evolução Médica API Service
Endpoints relacionados a evoluções médicas:
- CRUD de evoluções médicas
- Busca por consulta

### 8. Paciente API Service
Endpoints relacionados a pacientes:
- CRUD de pacientes
- Busca por CPF
- Operações complexas (reagendamento, check-in)

## Como usar

### Importação
```typescript
// Nova forma (recomendada)
import { siahmeApi, useGetUsersQuery } from "~/services/api";

// Ou forma legacy (ainda funciona)
import { siahmeApi, useGetUsersQuery } from "~/services/siahme-api.service";
```

### Hooks disponíveis
Todos os hooks gerados automaticamente pelo RTK Query estão disponíveis:

#### User hooks
- `useLoginMutation`
- `useGetUsersQuery`
- `useGetUserByIdQuery`
- `useCreateUserMutation`
- `useUpdateUserMutation`
- `useDeleteUserMutation`
- `useGetMedicosQuery`
- etc.

#### Agendamento hooks
- `useGetAgendamentosQuery`
- `useCreateAgendamentoMutation`
- etc.

#### Consulta hooks
- `useGetConsultasQuery`
- `useFetchAllConsultaDetailsQuery`
- etc.

#### E assim por diante para cada domínio...

## Vantagens da modularização

1. **Organização**: Cada domínio em seu próprio arquivo
2. **Manutenibilidade**: Fácil localizar e modificar endpoints específicos
3. **Escalabilidade**: Adicionar novos endpoints fica mais simples
4. **Reutilização**: Endpoints podem ser facilmente reutilizados
5. **Testabilidade**: Cada módulo pode ser testado independentemente
6. **Colaboração**: Diferentes desenvolvedores podem trabalhar em módulos diferentes

## Compatibilidade

O arquivo `siahme-api.service.ts` original foi mantido para compatibilidade com código existente, mas agora apenas re-exporta da nova estrutura modular. Recomenda-se migrar gradualmente para importar diretamente de `~/services/api`.

## Adicionando novos endpoints

1. Identifique o módulo correto (ou crie um novo se necessário)
2. Adicione o endpoint no arquivo do módulo
3. Exporte o hook no arquivo `index.ts`
4. Adicione tags apropriadas para cache invalidation
