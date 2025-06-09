# HemoseSystem - Frontend

Sistema de gestão hospitalar moderno desenvolvido para o projeto Porto Digital. Frontend construído com React Router 7, TypeScript e HeroUI para uma experiência de usuário moderna e responsiva.

## 🏥 Sobre o Projeto

O HemoseSystem é um sistema completo de gestão hospitalar que oferece funcionalidades para:

- **Recepção**: Cadastro de pacientes, agendamentos e check-ins
- **Atendimento Médico**: Consultas, anamneses, evoluções médicas
- **Enfermaria**: Acompanhamento de pacientes internados
- **Gestão de Exames**: Upload, visualização e gerenciamento de resultados
- **Prontuários**: Histórico completo dos pacientes
- **Administração**: Gerenciamento de funcionários, roles e permissões

## 🚀 Tecnologias Utilizadas

- **React Router 7** - Framework full-stack para React
- **TypeScript** - Tipagem estática
- **HeroUI** - Biblioteca de componentes UI moderna
- **Redux Toolkit (RTK Query)** - Gerenciamento de estado e cache de dados
- **TailwindCSS** - Framework CSS utilitário
- **Phosphor Icons** - Ícones modernos
- **Framer Motion** - Animações fluidas

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd hemoseSystem/front
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto frontend
# Configure a URL da API backend
VITE_API_URL=http://localhost:3000
```

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento (frontend apenas)
npm run dev

# Inicia frontend + backend simultaneamente
npm run dev-api
```

A aplicação estará disponível em `http://localhost:5173`.

### Produção

```bash
# Gera build de produção
npm run build

# Inicia servidor de produção
npm run start
```

### Verificação de tipos

```bash
# Verifica tipos TypeScript
npm run typecheck
```

## 📁 Estrutura do Projeto

```
front/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── main-layout/     # Layout principal
│   │   ├── sidebar-menu/    # Menu lateral
│   │   ├── ambulatorio/     # Componentes do ambulatório
│   │   ├── consulta/        # Componentes de consulta
│   │   ├── paciente/        # Componentes do paciente
│   │   └── ...
│   ├── pages/               # Páginas da aplicação
│   │   ├── auth/            # Páginas de autenticação
│   │   ├── pacientes/       # Páginas de pacientes
│   │   ├── modulos/         # Módulos específicos
│   │   └── ...
│   ├── routes/              # Rotas da aplicação
│   │   ├── admin/           # Rotas administrativas
│   │   ├── auth/            # Rotas de autenticação
│   │   └── ...
│   ├── services/            # Serviços e APIs
│   │   └── api/             # Configuração RTK Query
│   ├── hooks/               # Hooks customizados
│   ├── utils/               # Utilitários
│   ├── store.ts             # Configuração Redux
│   ├── routes.ts            # Configuração de rotas
│   └── root.tsx             # Componente raiz
├── public/                  # Arquivos estáticos
└── package.json
```

## 🔐 Autenticação

O sistema utiliza autenticação baseada em JWT com os seguintes roles:

- **Administrador**: Acesso completo ao sistema
- **Médico**: Consultas, prontuários, exames
- **Enfermeiro**: Enfermaria, administração de medicamentos
- **Recepcionista**: Agendamentos, cadastros de pacientes
- **Gestor**: Relatórios e análises

## 🌐 API Integration

A aplicação consome uma API REST desenvolvida em Node.js com:

- **RTK Query** para cache e sincronização de dados
- **Endpoints organizados** por entidade (pacientes, consultas, exames, etc.)
- **Tipagem completa** de requisições e respostas
- **Tratamento de erros** centralizado

## 📱 Responsividade

O sistema é totalmente responsivo, funcionando em:

- 🖥️ Desktop
- 📱 Tablets
- 📱 Smartphones

## 🎨 Design System

Utilizamos o **HeroUI** como base do design system, garantindo:

- Componentes consistentes
- Acessibilidade (WCAG)
- Temas personalizáveis
- Animações suaves

## 🚦 Status do Projeto

O projeto está em desenvolvimento ativo com as seguintes funcionalidades implementadas:

- ✅ Autenticação e autorização
- ✅ Cadastro e gestão de pacientes
- ✅ Sistema de agendamentos
- ✅ Consultas médicas
- ✅ Prontuários eletrônicos
- ✅ Gestão de exames
- ✅ Interface de enfermaria
- ✅ Painel administrativo

## � CI/CD e Deploy

O projeto utiliza **GitHub Actions** para automatizar o processo de deploy em um VPS.

### Workflow de Deploy

O deploy é acionado automaticamente a cada push na branch `main`:

```yaml
# .github/workflows/deploy-frontend-vps.yml
name: Deploy Frontend to VPS
on:
  push:
    branches: [main]
```

### Processo de Deploy

1. **Conexão VPS**: Utiliza SSH Action para conectar ao servidor
2. **Pull do código**: Atualiza o código no servidor via Git
3. **Instalação**: Executa `npm install` para dependências
4. **Build**: Gera build de produção com `npm run build`
5. **Deploy**: Copia arquivos para o diretório público do servidor

### Ambiente de Produção

- **Servidor**: VPS com Ubuntu
- **Node.js**: Versão 22.15.0 (gerenciado via NVM)
- **URL**: `siahme.application-well.com.br`
- **Processo**: Automático via GitHub Actions

### Secrets Necessários

Para o funcionamento do CI/CD, são necessários os seguintes secrets no GitHub:

- `VPS_URL`: URL do servidor VPS
- `FRONTEND_UBUNTU_USER`: Usuário do Ubuntu no VPS
- `VPS_SSH`: Chave SSH privada para acesso ao servidor

### Monitoramento

- ✅ Deploy automático na branch main
- ✅ Build e testes automatizados
- ✅ Rollback automático em caso de falha
- ✅ Notificações de status do deploy

## �👥 Contribuição

Este projeto faz parte do programa Porto Digital. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é parte do programa Porto Digital e segue as diretrizes do programa.

---

Desenvolvido para A FPSH - Porto Digital
