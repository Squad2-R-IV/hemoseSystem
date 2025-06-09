# AGENTS.md - HemoseSystem

## 📋 Visão Geral do Projeto

O HemoseSystem é um sistema completo de gestão hospitalar desenvolvido para o Porto Digital, composto por:

- **Backend** (`/back`): API REST em Node.js + TypeScript + Prisma + MySQL
- **Frontend** (`/front`): Interface em React Router 7 + TypeScript + HeroUI

## 🏗️ Arquitetura e Estrutura

### Backend (`/back`)
```
back/
├── src/
│   ├── controllers/     # Controladores REST
│   ├── services/        # Lógica de negócio
│   ├── repositories/    # Acesso a dados (Prisma)
│   ├── middlewares/     # Auth, CORS, validação
│   ├── routes/          # Definições de rotas
│   ├── Dtos/           # Data Transfer Objects
│   ├── utils/          # Utilitários
│   ├── config/         # Configurações
│   └── server.ts       # Entry point
├── prisma/
│   ├── schema/         # Schemas modulares
│   └── migrations/     # Migrações do banco
└── logs/              # Logs da aplicação
```

### Frontend (`/front`)
```
front/
├── app/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── routes/        # Rotas da aplicação
│   ├── services/      # APIs e RTK Query
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utilitários
│   ├── store.ts       # Redux store
│   └── routes.ts      # Configuração de rotas
└── public/           # Assets estáticos
```

## 🔧 Comandos de Desenvolvimento

### Backend
```bash
cd back
npm install                    # Instalar dependências
npm run dev                   # Desenvolvimento
npm run build                 # Build para produção
npm run migrate              # Executar migrações
npm run generate             # Gerar cliente Prisma
npm run seed                 # Popular banco com dados de teste
```

### Frontend
```bash
cd front
npm install                   # Instalar dependências
npm run dev                  # Desenvolvimento (porta 5173)
npm run dev-api              # Dev frontend + backend
npm run build                # Build para produção
npm run typecheck           # Verificação de tipos
```

## 🧪 Testes e Validação

### Executar Testes
```bash
# Backend - verificar se servidor inicia
cd back && npm run dev

# Frontend - verificar build
cd front && npm run build

# Verificação de tipos TypeScript
cd front && npm run typecheck
cd back && npx tsc --noEmit
```

### Validações Obrigatórias
1. **Prisma**: Sempre executar `npm run generate` após mudanças no schema
2. **Migrações**: Executar `npm run migrate` após mudanças no banco
3. **Build**: Verificar se `npm run build` executa sem erros
4. **TypeScript**: Não deve haver erros de tipos

## 📝 Padrões de Código

### Convenções Gerais
- **Linguagem**: TypeScript em todo o projeto
- **Estilo**: ESLint configurado no backend
- **Nomenclatura**: camelCase para variáveis, PascalCase para componentes
- **Commits**: Mensagens descritivas em português

### Backend - Padrões Específicos
- **Arquitetura**: Clean Architecture (Controller → Service → Repository)
- **DTOs**: Sempre validar entrada com DTOs tipados
- **Erro Handling**: Usar try/catch e retornar ResponseDto padronizado
- **Autenticação**: JWT com middleware `authMiddleware`
- **Permissões**: RBAC com `checkPermission` middleware

#### Estrutura de Controller
```typescript
@injectable()
export class ExemploController {
  constructor(private exemploService: ExemploService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as CreateExemploDto;
      const result = await this.exemploService.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

#### Estrutura de Service
```typescript
@injectable()
export class ExemploService {
  constructor(private exemploRepository: ExemploRepository) {}

  async create(data: CreateExemploDto): Promise<ResponseDto<Exemplo>> {
    // Lógica de negócio aqui
    const exemplo = await this.exemploRepository.create(data);
    return { success: true, data: exemplo };
  }
}
```

### Frontend - Padrões Específicos
- **Componentes**: Functional components com TypeScript
- **State**: Redux Toolkit + RTK Query para APIs
- **Styling**: TailwindCSS + HeroUI components
- **Routing**: React Router 7 com file-based routing

#### Estrutura de Componente
```tsx
interface ExemploProps {
  data: ExemploType;
  onAction: (id: number) => void;
}

export default function Exemplo({ data, onAction }: ExemploProps) {
  return (
    <div className="p-4">
      {/* Componente aqui */}
    </div>
  );
}
```

#### RTK Query Hook
```typescript
export const exemploApi = siahmeApi.injectEndpoints({
  endpoints: (builder) => ({
    getExemplos: builder.query<Exemplo[], void>({
      query: () => '/exemplo',
      providesTags: ['Exemplo'],
    }),
  }),
});

export const { useGetExemplosQuery } = exemploApi;
```

## 🗄️ Banco de Dados

### Prisma Schema
- **Localização**: `back/prisma/schema/`
- **Modular**: Cada entidade em arquivo separado
- **Relacionamentos**: Sempre definir foreign keys corretamente

### Modificações no Schema
1. Editar arquivo na pasta `schema/`
2. Executar `npm run generate`
3. Executar `npm run migrate`
4. Testar se aplicação inicia corretamente

## 🔐 Autenticação e Segurança

### Sistema de Permissões
- **Roles**: admin, medico, enfermeiro, recepcionista, gestor
- **Middleware**: `checkPermission('permission_name')`
- **JWT**: Tokens de acesso + refresh tokens

### Proteção de Rotas
```typescript
// Backend
router.get('/exemplo', authMiddleware, checkPermission('READ_EXEMPLO'), controller.getAll);

// Frontend - verificar roles no componente
const userRoles = useSelector(selectUserRoles);
```

## 🌐 APIs e Integração

### Endpoints RESTful
- `GET /resource` - Listar todos
- `GET /resource/:id` - Buscar por ID
- `POST /resource` - Criar novo
- `PUT /resource/:id` - Atualizar
- `DELETE /resource/:id` - Deletar

### Query Parameters Comuns
- `includeRelations=true` - Incluir relacionamentos
- `consultaId=:id` - Filtrar por consulta
- `pacienteId=:id` - Filtrar por paciente

## 📤 Upload de Arquivos

### Configuração Multer
- **Tipos suportados**: PDF, imagens (JPG, PNG, TIFF), DICOM, DOC, XLS
- **Endpoint**: `POST /arquivo-exame/upload`
- **Validação**: Tipo e tamanho de arquivo

## 🚀 Deploy e CI/CD

### GitHub Actions
- **Trigger**: Push na branch `main`
- **Backend**: Deploy automático no VPS + PM2 restart
- **Frontend**: Build e deploy estático

### Ambiente de Produção
- **Backend**: `api-siahme.application-well.com.br`
- **Frontend**: `siahme.application-well.com.br`
- **Banco**: MySQL em produção

## 🐛 Debugging e Logs

### Logs do Backend
- **Winston**: Sistema de logs estruturado
- **Localização**: `back/logs/`
- **Produção**: PM2 logs (`pm2 logs api_siahme`)

### Debugging Frontend
- **Redux DevTools**: Para state management
- **Network Tab**: Para requisições da API
- **Console**: Para erros TypeScript

## 📋 Checklist para Novas Features

### Backend
- [ ] Criar/atualizar schema Prisma se necessário
- [ ] Executar migrações (`npm run migrate`)
- [ ] Implementar Repository
- [ ] Implementar Service com lógica de negócio
- [ ] Implementar Controller
- [ ] Criar/atualizar DTOs
- [ ] Adicionar rotas com middlewares apropriados
- [ ] Testar endpoints com Postman/Insomnia
- [ ] Verificar se build executa (`npm run build`)

### Frontend
- [ ] Criar/atualizar tipos TypeScript
- [ ] Implementar endpoints no RTK Query
- [ ] Criar componentes necessários
- [ ] Implementar páginas/rotas
- [ ] Adicionar validações de formulário
- [ ] Testar responsividade
- [ ] Verificar typecheck (`npm run typecheck`)
- [ ] Testar build (`npm run build`)

## 🔍 Principais Entidades

### Médicas
- **Paciente**: Dados dos pacientes
- **Agendamento**: Agendamentos de consultas
- **Consulta**: Consultas médicas realizadas
- **Anamnese**: Primeiro contato médico-paciente
- **Conduta**: Prescrições e condutas médicas
- **EvolucaoMedica**: Evolução do estado do paciente
- **EvolucaoEnfermagem**: Cuidados de enfermagem
- **AltaMedica**: Registros de alta
- **Exame**: Dados dos exames
- **ArquivoExame**: Arquivos dos exames

### Sistema
- **User**: Usuários do sistema
- **Role**: Funções/cargos
- **Permission**: Permissões específicas
- **Auditoria**: Log de operações

## 📞 Suporte e Dúvidas

Para dúvidas específicas:
1. Consultar documentação Swagger: `http://localhost:3000/api-docs`
2. Verificar logs em `back/logs/`
3. Consultar exemplos de código existentes no projeto
4. Verificar padrões estabelecidos nos controllers/services existentes

---

**Importante**: Sempre seguir os padrões estabelecidos e executar os comandos de validação antes de finalizar qualquer tarefa.
