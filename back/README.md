# Siahme Backend

## Visão Geral

O HemoseSystem é um sistema completo de gerenciamento médico desenvolvido para facilitar o acompanhamento de pacientes, agendamentos, consultas médicas, exames e registros hospitalares. O backend foi construído utilizando tecnologias modernas e seguindo padrões de arquitetura limpa.

## 🏗️ Arquitetura e Tecnologias

### Stack Tecnológica
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express.js** - Framework web
- **Prisma ORM** - Mapeamento objeto-relacional
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **Bcrypt** - Criptografia de senhas
- **TSyringe** - Injeção de dependências
- **Winston** - Sistema de logs
- **Swagger** - Documentação da API
- **Multer** - Upload de arquivos

### Padrões de Arquitetura
O projeto segue uma **Arquitetura Limpa (Clean Architecture)** com separação clara de responsabilidades:

```
src/
├── controllers/       # Controladores (Interface de entrada)
├── services/         # Serviços (Lógica de negócio)
├── repositories/     # Repositórios (Acesso a dados)
├── middlewares/      # Middlewares (Interceptadores)
├── routes/          # Definições de rotas
├── config/          # Configurações
├── utils/           # Utilitários
├── Dtos/            # Data Transfer Objects
└── types/           # Definições de tipos
```

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js (versão 18+)
- MySQL (versão 8+)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone [URL_DO_REPOSITORIO]
cd hemoseSystem/back
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL="mysql://username:password@localhost:3306/hemose_db"
ACCESS_TOKEN_SECRET="sua_chave_secreta_jwt"
REFRESH_TOKEN_SECRET="sua_chave_secreta_refresh"
```

4. **Execute as migrações do banco de dados**
```bash
npm run migrate
```

5. **Gere o cliente Prisma**
```bash
npm run generate
```

6. **Execute o seed (opcional)**
```bash
npm run seed
```

7. **Inicie o servidor**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`
A documentação Swagger estará em `http://localhost:3000/api-docs`

## 📊 Modelo de Dados

### Principais Entidades

#### 👤 Gestão de Usuários e Permissões
- **User**: Usuários do sistema
- **Role**: Funções/cargos dos usuários
- **Permission**: Permissões específicas
- **UserToRole**: Relacionamento usuário-função
- **RoleToPermission**: Relacionamento função-permissão

#### 🏥 Gestão Médica
- **Paciente**: Dados dos pacientes
- **Agendamento**: Agendamentos de consultas
- **Consulta**: Consultas médicas realizadas


#### 📋 Registros Médicos
- **Anamnese**: Primeiro contato médico-paciente
- **Conduta**: Condutas médicas prescritas
- **AdministracaoConduta**: Administração de medicamentos
- **EvolucaoMedica**: Evolução médica do paciente
- **EvolucaoEnfermagem**: Evolução de enfermagem
- **AltaMedica**: Registros de alta médica

#### 🔬 Exames
- **Exame**: Dados dos exames
- **ArquivoExame**: Arquivos relacionados aos exames

#### 📝 Auditoria
- **Auditoria**: Log de todas as operações realizadas no sistema

### Relacionamentos Principais
- Um paciente pode ter múltiplas consultas
- Uma consulta pode ter uma anamnese e um exame físico
- Uma consulta pode ter múltiplas condutas
- Uma conduta pode ter múltiplas administrações
- Um exame pode ter múltiplos arquivos

## 🛡️ Sistema de Autenticação e Autorização

### Autenticação JWT
O sistema utiliza JWT (JSON Web Tokens) para autenticação:
- **Access Token**: Válido por 1 dia
- **Refresh Token**: Para renovação do access token

### Sistema de Permissões RBAC
Implementa Role-Based Access Control (RBAC):
- **Usuários** possuem **Funções** (Roles)
- **Funções** possuem **Permissões** específicas
- Middleware `checkPermission` valida permissões por endpoint

### Middlewares de Segurança
- `authMiddleware`: Valida token JWT
- `adminOnlyMiddleware`: Acesso apenas para administradores
- `checkPermission`: Valida permissões específicas

## 🌐 API e Endpoints

### Estrutura das Rotas
Todas as rotas seguem padrões RESTful:
- `GET /[recurso]` - Listar todos
- `GET /[recurso]/:id` - Buscar por ID
- `POST /[recurso]` - Criar novo
- `PUT /[recurso]/:id` - Atualizar
- `DELETE /[recurso]/:id` - Deletar
- Quaiquer outros endpoints necessarios para a regra de negocio.

### Principais Grupos de Endpoints

#### 🔐 Autenticação e Autorização
**Autenticação de Usuários**
- `POST /users/login` - Login de usuário
- `POST /users/logout` - Logout de usuário (🔒 Auth)
- `POST /users/refreshToken` - Renovar token de acesso

**Gestão de Roles e Permissões**
- `GET /role` - Listar todas as funções (🔒 Auth + Permission)
- `POST /role` - Criar nova função (🔒 Auth + Permission)
- `GET /role/:id` - Buscar função por ID (🔒 Auth + Permission)
- `PUT /role/:id` - Atualizar função (🔒 Auth + Permission)
- `DELETE /role/:id` - Deletar função (🔒 Auth + Permission)

- `GET /permission` - Listar todas as permissões (🔒 Auth + Permission)
- `POST /permission` - Criar nova permissão (🔒 Auth + Permission)
- `GET /permission/:id` - Buscar permissão por ID (🔒 Auth + Permission)
- `PUT /permission/:id` - Atualizar permissão (🔒 Auth + Permission)
- `DELETE /permission/:id` - Deletar permissão (🔒 Auth + Permission)

**Associações de Roles e Permissões**
- `GET /role-to-permission` - Listar associações role-permissão (🔒 Auth + Permission)
- `POST /role-to-permission` - Criar associação role-permissão (🔒 Auth + Permission)
- `DELETE /role-to-permission/:roleId/:permissionId` - Deletar associação (🔒 Auth + Permission)

- `GET /user-to-role` - Listar associações usuário-role (🔒 Auth + Permission)
- `POST /user-to-role` - Criar associação usuário-role (🔒 Auth + Permission)
- `DELETE /user-to-role/:userId/:roleId` - Deletar associação (🔒 Auth + Permission)

#### 👤 Gestão de Usuários
**CRUD Básico de Usuários**
- `GET /users` - Listar todos os usuários
- `POST /users` - Criar novo usuário
- `GET /users/:id` - Buscar usuário por ID (🔒 Auth)
- `PUT /users/:id` - Atualizar usuário (🔒 Auth)
- `DELETE /users/:id` - Deletar usuário (🔒 Auth + Admin)

**Gestão de Roles de Usuários**
- `POST /users/changeUserRoles` - Alterar roles de um usuário (🔒 Auth + Admin)

**Consultas por Especialidade/Função**
- `GET /users/medicos` - Listar usuários com role "medico" (🔒 Auth)
- `GET /users/enfermeiros` - Listar usuários com role "enfermeiro" (🔒 Auth)
- `GET /users/recepcionistas` - Listar usuários com role "recepcionista" (🔒 Auth)
- `GET /users/dentistas` - Listar usuários com role "dentista" (🔒 Auth)
- `GET /users/fisioterapeutas` - Listar usuários com role "fisioterapeuta" (🔒 Auth)
- `GET /users/gestores` - Listar usuários com role "gestor" (🔒 Auth)
- `GET /users/nutricionistas` - Listar usuários com role "nutricionista" (🔒 Auth)

#### 🏥 Gestão de Pacientes
**CRUD de Pacientes**
- `GET /paciente` - Listar todos os pacientes (🔒 Auth + Permission)
- `POST /paciente` - Cadastrar novo paciente (🔒 Auth + Permission)
- `GET /paciente/:id` - Buscar paciente por ID (🔒 Auth + Permission)
- `PUT /paciente/:id` - Atualizar dados do paciente (🔒 Auth + Permission)
- `DELETE /paciente/:id` - Deletar paciente (🔒 Auth + Permission)

#### 📅 Agendamentos
**CRUD de Agendamentos**
- `GET /agendamento` - Listar todos os agendamentos (🔒 Auth + Permission)
- `POST /agendamento` - Criar novo agendamento (🔒 Auth + Permission)
- `GET /agendamento/:id` - Buscar agendamento por ID (🔒 Auth + Permission)
- `PUT /agendamento/:id` - Atualizar agendamento (🔒 Auth + Permission)
- `DELETE /agendamento/:id` - Deletar agendamento (🔒 Auth + Permission)

**Consultas Especializadas de Agendamentos**
- `GET /agendamento/data/:date` - Buscar agendamentos por data (🔒 Auth + Permission)
- `GET /agendamento/consultas-ativas` - Agendamentos com consultas ativas (🔒 Auth + Permission)
- `GET /agendamento/consultas-enfermaria` - Agendamentos na enfermaria (🔒 Auth + Permission)

#### 🩺 Consultas Médicas
**CRUD de Consultas**
- `GET /consulta` - Listar todas as consultas (🔒 Auth + Permission)
- `POST /consulta` - Registrar nova consulta (🔒 Auth + Permission)
- `GET /consulta/:id` - Buscar consulta por ID (🔒 Auth + Permission)
- `PUT /consulta/:id` - Atualizar consulta (🔒 Auth + Permission)
- `DELETE /consulta/:id` - Deletar consulta (🔒 Auth + Permission)

#### 📋 Anamnese
**CRUD de Anamnese**
- `GET /anamnese` - Listar todas as anamneses (🔒 Auth + Permission)
- `POST /anamnese` - Criar nova anamnese (🔒 Auth + Permission)
- `GET /anamnese/:id` - Buscar anamnese por ID (🔒 Auth + Permission)
- `PUT /anamnese/:id` - Atualizar anamnese (🔒 Auth + Permission)
- `DELETE /anamnese/:id` - Deletar anamnese (🔒 Auth + Permission)

**Consultas por Relacionamento**
- `GET /anamnese/consulta?consultaId=:id` - Anamneses de uma consulta específica (🔒 Auth + Permission)

#### 💊 Condutas Médicas
**CRUD de Condutas**
- `GET /conduta` - Listar todas as condutas (🔒 Auth + Permission)
- `POST /conduta` - Criar nova conduta (🔒 Auth + Permission)
- `GET /conduta/:id` - Buscar conduta por ID (🔒 Auth + Permission)
- `PUT /conduta/:id` - Atualizar conduta (🔒 Auth + Permission)
- `DELETE /conduta/:id` - Deletar conduta (🔒 Auth + Permission)

**Consultas por Relacionamento**
- `GET /conduta/consulta?consultaId=:id` - Condutas de uma consulta específica (🔒 Auth + Permission)

#### 💉 Administração de Condutas
**CRUD de Administração de Condutas**
- `GET /administracao-conduta` - Listar todas as administrações (🔒 Auth + Permission)
- `POST /administracao-conduta` - Criar nova administração (🔒 Auth + Permission)
- `GET /administracao-conduta/:id` - Buscar administração por ID (🔒 Auth + Permission)
- `PUT /administracao-conduta/:id` - Atualizar administração (🔒 Auth + Permission)
- `DELETE /administracao-conduta/:id` - Deletar administração (🔒 Auth + Permission)

**Consultas por Relacionamento**
- `GET /administracao-conduta/conduta?condutaId=:id` - Administrações de uma conduta específica (🔒 Auth + Permission)

#### 📈 Evoluções Médicas
**CRUD de Evoluções Médicas**
- `GET /evolucao-medica` - Listar todas as evoluções médicas (🔒 Auth + Permission)
- `POST /evolucao-medica` - Criar nova evolução médica (🔒 Auth + Permission)
- `GET /evolucao-medica/:id` - Buscar evolução médica por ID (🔒 Auth + Permission)
- `PUT /evolucao-medica/:id` - Atualizar evolução médica (🔒 Auth + Permission)
- `DELETE /evolucao-medica/:id` - Deletar evolução médica (🔒 Auth + Permission)

**Consultas por Relacionamento**
- `GET /evolucao-medica/consulta?consultaId=:id` - Evoluções médicas de uma consulta específica (🔒 Auth + Permission)

#### 🩹 Evoluções de Enfermagem
**CRUD de Evoluções de Enfermagem**
- `GET /evolucao-enfermagem` - Listar todas as evoluções de enfermagem (🔒 Auth + Permission)
- `POST /evolucao-enfermagem` - Criar nova evolução de enfermagem (🔒 Auth + Permission)
- `GET /evolucao-enfermagem/:id` - Buscar evolução de enfermagem por ID (🔒 Auth + Permission)
- `PUT /evolucao-enfermagem/:id` - Atualizar evolução de enfermagem (🔒 Auth + Permission)
- `DELETE /evolucao-enfermagem/:id` - Deletar evolução de enfermagem (🔒 Auth + Permission)

**Consultas por Relacionamento**
- `GET /evolucao-enfermagem/consulta?consultaId=:id` - Evoluções de enfermagem de uma consulta específica (🔒 Auth + Permission)

#### 🏠 Altas Médicas
**CRUD de Altas Médicas**
- `GET /alta-medica` - Listar todas as altas médicas (🔒 Auth + Permission)
- `POST /alta-medica` - Criar nova alta médica (🔒 Auth + Permission)
- `GET /alta-medica/:id` - Buscar alta médica por ID (🔒 Auth + Permission)
- `PUT /alta-medica/:id` - Atualizar alta médica (🔒 Auth + Permission)
- `DELETE /alta-medica/:id` - Deletar alta médica (🔒 Auth + Permission)

**Consultas por Relacionamento**
- `GET /alta-medica/consulta?consultaId=:id` - Altas médicas de uma consulta específica (🔒 Auth + Permission)

#### 🔬 Exames
**CRUD de Exames**
- `GET /exame` - Listar todos os exames (🔒 Auth + Permission)
- `POST /exame` - Criar novo exame (🔒 Auth + Permission)
- `GET /exame/:id` - Buscar exame por ID (🔒 Auth + Permission)
- `PUT /exame/:id` - Atualizar exame (🔒 Auth + Permission)
- `DELETE /exame/:id` - Deletar exame (🔒 Auth + Permission)

**Consultas Especializadas de Exames**
- `GET /exame/paciente/:pacienteId` - Exames de um paciente específico (🔒 Auth + Permission)
- `GET /exame/status/:status` - Exames filtrados por status (🔒 Auth + Permission)

#### 📄 Arquivos de Exames
**CRUD de Arquivos de Exames**
- `GET /arquivo-exame` - Listar todos os arquivos de exames (🔒 Auth + Permission)
- `POST /arquivo-exame` - Criar registro de arquivo de exame (🔒 Auth + Permission)
- `GET /arquivo-exame/:id` - Buscar arquivo de exame por ID (🔒 Auth + Permission)
- `PUT /arquivo-exame/:id` - Atualizar arquivo de exame (🔒 Auth + Permission)
- `DELETE /arquivo-exame/:id` - Deletar arquivo de exame (🔒 Auth + Permission)

**Upload e Download de Arquivos**
- `POST /arquivo-exame/upload` - Upload de arquivo único (🔒 Auth + Permission + Multer)
- `POST /arquivo-exame/upload-multiplos` - Upload de múltiplos arquivos (🔒 Auth + Permission + Multer)
- `GET /arquivo-exame/download/:id` - Download de arquivo específico (🔒 Auth + Permission)

**Consultas Especializadas de Arquivos**
- `GET /arquivo-exame/exame/:exameId` - Arquivos de um exame específico (🔒 Auth + Permission)
- `GET /arquivo-exame/tipo/:tipoArquivo` - Arquivos filtrados por tipo (🔒 Auth + Permission)

### 🔒 Níveis de Autenticação

**Legendas:**
- 🔓 **Público** - Sem autenticação necessária
- 🔒 **Auth** - Requer token JWT válido
- 🔒 **Auth + Permission** - Requer token JWT + permissão específica
- 🔒 **Auth + Admin** - Requer token JWT + role de administrador
- 📤 **Multer** - Endpoint com upload de arquivos

### 📊 Formatos de Arquivo Suportados (Upload)
- **PDF**: `application/pdf`
- **Imagens**: `image/jpeg`, `image/jpg`, `image/png`, `image/tiff`
- **DICOM**: `application/dicom`
- **Excel**: `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- **Word**: `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- **Texto**: `text/plain`

### 📋 Query Parameters Comuns
- `includeRelations=true` - Incluir dados relacionados na resposta
- `consultaId=:id` - Filtrar por ID da consulta
- `condutaId=:id` - Filtrar por ID da conduta
- `pacienteId=:id` - Filtrar por ID do paciente
- `exameId=:id` - Filtrar por ID do exame

## 📁 Upload de Arquivos

O sistema suporta upload de arquivos para exames médicos:
- Utiliza o middleware `multer` para processamento
- Arquivos são armazenados localmente
- Suporte a múltiplos formatos (PDF, imagens, etc.)

## 📝 Sistema de Logs e Auditoria

### Logs
- Utiliza **Winston** para logging estruturado
- Logs de operações importantes
- Diferentes níveis de log (info, warn, error)

### Auditoria
- Todas as operações CRUD são auditadas
- Registra usuário, data/hora, ação e dados
- Mantém histórico completo de alterações

## 🧪 Padrões de Desenvolvimento

### Dependency Injection
Utiliza **TSyringe** para injeção de dependências:
```typescript
@injectable()
export class UserController {
  constructor(
    @inject("UserService") private userService: IUserService
  ) {}
}
```

### Generic Controllers
Implementa controladores genéricos para operações CRUD:
```typescript
export class GenericController<TEntity, TCreateDto, TUpdateDto, TReadDto>
```

### DTOs (Data Transfer Objects)
Utiliza DTOs para validação e transformação de dados:
- `CreateDto`: Para criação
- `UpdateDto`: Para atualização
- `ReadDto`: Para leitura/resposta

### Error Handling
- Middleware global de tratamento de erros
- Tratamento específico para erros do Prisma
- Respostas padronizadas de erro

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger UI em:
`http://localhost:3000/api-docs`

### Configuração do Swagger

- Schemas dos modelos de dados
- Exemplos de requisições e respostas
- Interface interativa para testes

## 🗄️ Scripts Disponíveis

```json
{
  "dev": "ts-node src/server.ts",           // Desenvolvimento
  "build": "tsc",                           // Compilação
  "start": "node dist/server.js",           // Produção
  "migrate": "prisma migrate dev",          // Migração dev
  "migrate:deploy": "prisma migrate deploy", // Migração produção
  "generate": "prisma generate",            // Gerar cliente
  "seed": "ts-node src/seed.ts"            // Popular BD
}
```

## 🔧 Configurações Importantes

### Prisma
- Configurado para usar **MySQL**
- Schema modular (múltiplos arquivos)
- Migrações automáticas
- Cliente tipado

### CORS
- Configurado para permitir requisições cross-origin
- Ajuste conforme necessário para produção

### Cookies
- Suporte a cookies para refresh tokens
- Configuração de segurança adequada

## 🚀 Deploy e Produção

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
DATABASE_URL="mysql://user:pass@host:port/db"
ACCESS_TOKEN_SECRET="strong_secret_key"
REFRESH_TOKEN_SECRET="strong_refresh_key"
```

### Comandos para Deploy
```bash
npm run build           # Compilar TypeScript
npm run migrate:deploy  # Executar migrações
npm start              # Iniciar em produção
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**
   - Verificar `DATABASE_URL` no `.env`
   - Confirmar se o MySQL está rodando

2. **Erro de token JWT**
   - Verificar `ACCESS_TOKEN_SECRET` no `.env`
   - Confirmar formato do header Authorization

3. **Erro de migração**
   - Executar `npm run generate`
   - Verificar se o banco de dados existe

4. **Erro de permissão**
   - Verificar se o usuário tem as roles necessárias
   - Confirmar configuração de permissões

## 📞 Suporte e Manutenção

### Estrutura para Manutenção
- Código bem documentado e comentado
- Padrões consistentes em todo o projeto
- Separação clara de responsabilidades
- Testes unitários (a serem implementados)

### Boas Práticas para Desenvolvimento
1. Sempre criar DTOs para novos endpoints
2. Implementar validações adequadas
3. Adicionar logs para operações importantes
4. Manter documentação Swagger atualizada
5. Seguir padrões de nomenclatura estabelecidos

### Adição de Novas Funcionalidades
1. Criar schema Prisma na pasta `prisma/schema/`
2. Executar migração: `npm run migrate`
3. Criar DTOs em `src/Dtos/`
4. Implementar Repository em `src/repositories/`
   - Definir relações disponíveis no array `availableRelations` do construtor
   - Exemplo: `super(prisma, prisma.conduta, ['User', 'Consulta', 'AdministracaoCondutas'])`
5. **[OPCIONAL]** Criar tipos de include em `src/utils/includeTypes.ts` para joins automáticos
   - Definir tipos que incluem relações para melhor tipagem TypeScript
   - Exemplo: `CondutaWithRelations = Conduta & { User?: User; Consulta?: Consulta; }`
6. Implementar Service em `src/services/`
7. Implementar Controller em `src/controllers/`
8. Criar rotas em `src/routes/`
9. Adicionar rotas no `server.ts`
10. Atualizar documentação

#### 📋 Sistema de Include Types (Opcional)

O sistema implementa tipos automáticos para joins de relacionamentos:

**Configuração no Repository:**
```typescript
export class CondutaRepository extends GenericRepository<Conduta> {
  constructor() {
    // Define quais relações estão disponíveis para joins automáticos
    super(prisma, prisma.conduta, ['User', 'Consulta', 'AdministracaoCondutas']);
  }
}
```

**Tipos de Include (src/utils/includeTypes.ts):**
```typescript
export type CondutaWithRelations = Conduta & {
  User?: User;
  Consulta?: Consulta;
  AdministracaoCondutas?: AdministracaoConduta[];
}
```

**Utilização nos Endpoints:**
- `GET /recurso?includeRelations=true` - Retorna dados com relacionamentos
- `GET /recurso?includeRelations=false` - Retorna apenas dados básicos
- Por padrão, `includeRelations=true` em métodos `findAll` e `findById`

## 🚀 CI/CD e Deploy

O backend utiliza **GitHub Actions** para automatizar o processo de deploy em um VPS.

### Workflow de Deploy

O deploy é acionado automaticamente a cada push na branch `main`:

```yaml
# .github/workflows/deploy-backend-vps.yml
name: Deploy Backend to VPS
on:
  push:
    branches: [main]
```

### Processo de Deploy

1. **Conexão VPS**: Utiliza SSH Action para conectar ao servidor
2. **Pull do código**: Atualiza o código no servidor via Git
3. **Instalação**: Executa `yarn install` para dependências
4. **Prisma**: Executa migrações, gera cliente e seed
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   npm run seed
   ```
5. **Build**: Compila TypeScript com `yarn build`
6. **Restart**: Reinicia aplicação via PM2 (`pm2 restart api_siahme`)

### Ambiente de Produção

- **Servidor**: VPS com Ubuntu
- **Node.js**: Versão 22.15.0 (gerenciado via NVM)
- **Process Manager**: PM2 para gerenciamento de processos
- **URL**: `api-siahme.application-well.com.br`
- **Banco**: MySQL em produção

### Secrets Necessários

Para o funcionamento do CI/CD, são necessários os seguintes secrets no GitHub:

- `VPS_URL`: URL do servidor VPS
- `BACKEND_UBUNTU_USER`: Usuário do Ubuntu no VPS
- `VPS_SSH`: Chave SSH privada para acesso ao servidor

### Comandos PM2

```bash
# Verificar status da aplicação
pm2 status

# Ver logs da aplicação
pm2 logs api_siahme

# Reiniciar aplicação
pm2 restart api_siahme

# Parar aplicação
pm2 stop api_siahme
```

### Monitoramento

- ✅ Deploy automático na branch main
- ✅ Migrações de banco automáticas
- ✅ Seed de dados em produção
- ✅ Restart automático via PM2
- ✅ Logs centralizados

---

Este sistema foi desenvolvido para ser robusto, escalável e de fácil manutenção. Para dúvidas específicas, consulte o código-fonte ou a documentação Swagger da API.
