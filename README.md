/project-root
|-- /backend                            # API e backend
|   |-- /src
|   |   |-- /controllers                # Controladores que gerenciam a lógica das rotas
|   |   |-- /services                   # Lógica de negócios e serviços (comunicação com DB, APIs externas)
|   |   |-- /models                     # Definição dos modelos (estruturas de dados)
|   |   |-- /routes                     # Definição das rotas (endpoints de API)
|   |   |-- /middlewares                # Middlewares para controle de acesso, autenticação, etc.
|   |-- /config                         # Arquivos de configuração (banco de dados, autenticação, etc.)
|   |-- /migrations                     # Scripts de migração de banco de dados
|   |-- /utils                          # Funções auxiliares para o backend
|-- /frontend                           # Aplicação Angular com Micro Frontends
|   |-- /app                            # Estrutura do aplicativo Angular
|   |   |-- /core                       # Funcionalidades e serviços compartilhados entre todos os micro frontends
|   |   |-- /shared                     # Componentes, diretivas e pipes compartilhados
|   |   |-- /auth                       # Micro frontend de autenticação e controle de usuários
|   |   |-- /affiliate                  # Micro frontend de gestão de afiliados
|   |   |   |-- /src
|   |   |   |   |-- /app
|   |   |   |   |   |-- /dashboard      # Dashboard principal do afiliado
|   |   |   |   |   |-- /profile        # Componente para edição do perfil do afiliado
|   |   |   |   |   |-- /commissions    # Relatório de comissões
|   |   |   |   |   |-- /promotions     # Links e banners para divulgação de promoções
|   |   |   |   |   |-- /payouts        # Interface para solicitação de pagamentos
|   |   |   |   |   |-- /notifications  # Notificações de promoções, pagamentos, etc.
|   |   |   |   |-- /services          # Serviços para comunicação com a API (afiliados, promoções, pagamentos)
|   |   |   |   |-- /store             # Gerenciamento de estado (NGRX, NGXS ou simples serviço de estado)
|   |   |   |   |-- /guards            # Guards de rota para controle de acesso
|   |   |   |   |-- /models            # Definições de modelos para dados do afiliado
|   |   |-- /client                     # Micro frontend para clientes da plataforma (como uma área de clientes, por exemplo)
|   |   |   |-- /src
|   |   |   |   |-- /app
|   |   |   |   |   |-- /dashboard      # Painel para clientes
|   |   |   |   |   |-- /contracts      # Contratos ou informações específicas do cliente
|   |   |   |   |   |-- /billing        # Faturamento e pagamentos do cliente
|   |   |   |   |-- /services          # Serviços para integração com as APIs de cliente
|   |   |-- /admin                      # Micro frontend de gestão administrativa
|   |   |   |-- /src
|   |   |   |   |-- /app
|   |   |   |   |   |-- /dashboard      # Painel de administração
|   |   |   |   |   |-- /user-management # Gestão de usuários e afiliados
|   |   |   |   |   |-- /reports        # Relatórios gerais de performance da plataforma
|   |   |   |   |   |-- /settings       # Configurações da plataforma
|   |   |   |   |-- /services          # Serviços para comunicação com a API (gestão de usuários, pagamentos, etc.)
|   |   |   |   |-- /store             # Gerenciamento de estado (para os dados administrativos)
|   |-- /assets                         # Arquivos estáticos (imagens, ícones, fontes)
|   |-- /environments                   # Configuração para diferentes ambientes (dev, prod)
|   |-- angular.json                    # Arquivo de configuração do Angular
|   |-- tsconfig.json                   # Configuração do TypeScript
|   |-- Dockerfile                      # Arquivo para construção da imagem Docker da aplicação
|-- /scripts                            # Scripts de automação para deploy, testes, e builds
|-- /docker                             # Configurações específicas de Docker
|   |-- /nginx                          # Configuração do Nginx para servir os micro frontends
|   |-- /docker-compose.yml             # Arquivo para orquestração de containers Docker
|-- /config                             # Configurações globais do projeto (banco, segurança, etc.)
|-- /logs                               # Arquivos de log (gerados no servidor ou containers)
|-- README.md                           # Documentação do projeto
|-- package.json                        # Dependências do projeto (Node, Angular, etc.)
|-- .env                                # Arquivo de variáveis de ambiente (para dev, prod)
