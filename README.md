# APP

GymPass style app.

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar
- [X] Deve ser possível se autenticar
- [X] Deve ser possível obter o perfil de um usuário logado
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [X] Deve ser possível o usuário obter seu histórico de check-ins
- [X] Deve ser possível o usuário buscar academias próximas (até 10km)
- [X] Deve ser possível o usuário buscar academias pelo nome
- [X] Deve ser possível o usuário realizar check-in em uma academia
- [X] Deve ser possível validar o check-in de um usuário
- [X] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado
- [X] O usuário não pode fazer 2 check-ins no mesmo dia
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [X] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [X] A senha do usuário precisa estar criptografada
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

# Comandos para o Docker

```docker ps```: Ver as imagens que estão ativas
```docker start <nome-da-image>```: Inicializar uma imagem
```docker stop <nome-da-image>```: Finalizar uma imagem
```docker compose up -d```: Fazer o compose de uma imagem do projeto
```docker compose stop```: Finalizar o compose da imagem do projeto
```docker compose down```: Finalizar e deletar aquele container (irá deletar as informações daquele container)

# Patterns Utilizados
- Factory Pattern
- Design Pattern
- Repository Pattern

# TDD (Test Drive Development)
- Etapas: Red, Green, Refactor
- Se você desenvolve o teste de uma regra de negócio antes da implementação daquilo, o teste por si só te ajuda a validar se a sua implementação está okay ou não

# Etapas do desenvolvimento
- Começou focando na parte mais interna do código, fazendo os casos de uso, testes e utilizando o in-memory
- Depois de implementado todos os casos de uso, partiu-se para as camadas mais externas da aplicação
- Criação das rotas, dos controllers, da integração com o prisma

# JWT
1. Usuário faz login
2. Envia e-mail e senha
3. O Back-end cria um token ÚNICO, não modificável e STATELESS (Não armazenado em nenhuma estrutura de persistência de dados, ou seja, banco de dados)
4. Back-end: quando vai criar o token ele usa uma PALAVRA-CHAVE (string)

Login => JWT
JWT => Todas requisições dali pra frente
Header (cabeçalho): Authorization: Bearer JWT

# CI / CD
CI = Continuous Integration
CD = Continuous Deployment / Delivery