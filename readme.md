# CRUD Typescript - Projeto Sala Dungeon

Essa aplicação é a primeira etapa do back-end do projeto Sala Dungeon, uma plataforma de ferramentas para RPGs de mesa.

## Especificação

### Tecnologias

- Typescript
- ApolloServer
- GraphQL
- Nexus (Code First)
- Prisma
- Redis
- Json Web Token

### Padrão de Projeto

Foi utilizado o padrão de arquitetura MVC com algumas alterações para se adequar a uma API GraphQL.
Os Schemas são o mapeamento do banco de dados e dos resolvers (Queries e Mutations).
Dentro de Modelos estão os objetos com propriedades e métodos necessários para a manipulação de uma tecnologia.
Os Controllers definem o fluxo de métodos para cada requisição.
Por fim, os Middlewares são validações que serão reutilizadas em diversas etapas do fluxo.

## Setting Up

É necessário configurar o ambiente de desenvolvimento para rodar a aplicação com as seguintes dependências:

- Faça o download do PostgreSQL pelo site e crie um banco de dados
- Crie um arquivo .env e declare uma variável DATABASE_URL com as informações de conexão do banco

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

- Nesse mesmo arquivo .env defina uma variável JWT_PASSWORD com uma string qualquer para gerar as chaves JWT

```
JWT_PASSWORD="stringaleatoria"
```

- Faça o Setup do Redis com WSL 2 (Windows)
- Baixe as dependências

```
yarn
```

- Para migrar os modelos para o banco de dados rode:

```
npx prisma migrate dev
```
ou
```
npx prisma migrate reset
```

## Testando a aplicação

Para iniciar a aplicação utilize: 
```
yarn start
```
Nagevando na url localhost:4000 é possível consultar a documentação e testar cada resolver da API GraphQL.