# API para Gerenciamento de Contas

Esse é o projeto de uma pequena API para gerenciamentos simples de uma conta bancária.

Esse projeto não implementa tudo que é necessário para uma conta bancária funcionar, no entanto, implementa o que é necessário para que o projeto de front, possa realizar suas ações.

O projeto de front relacionado, está disponível no seguinte [link](https://github.com/juliosieg/account-mgmt-front).



### Requisitos

Esse projeto depende da instalação do Node.js e do gerenciador de pacotes NPM.

### Instalação de Pacotes

Para executar o projeto pela primeira vez, é necessário rodar o seguinte comando:

`npm install`

O comando acima, fará a instalação de todos os pacotes necessários para funcionamento correto do servidor Nodejs. Sendo que os pacotes e suas versões estão definidos no arquivo `package.json`

### Configuração

O banco de dados está configurado no arquivo `config/config.json` apontando para uma base local sqlite.

Na primeira execução do servidor, deve ser realizada a migração e criação da(s) tabela(s) necessária(s), rodando o seguinte comando de migração do banco de dados na raiz do projeto:

`npx sequelize db:migrate`

### Execução

Após seguir os passos acima, o projeto já pode ser executado e testado. Para tanto, deve-se rodar o seguinte comando:

`npm run start`

Esse comando deverá rodar o servidor Node.js na porta **8001**, configurada por padrão.
Nesse caso não temos um arquivo de ambiente, então, a porta pode ser alterada, se necessário, no arquivo `server.js`

Com o servidor rodando, utilize um browser para acessar o link local:

`localhost:8001/api`(Se a porta foi alterada, deve ser alterada também nesse link)

Ao acessar esse link, uma mensagem de sucesso deve ser exibida, retornando o seguinte JSON:

`{ "data" : "Accounts API" }`


### Rotas da API

Essa API está configurada para funcionar nas rotas descritas abaixo, sendo que para cada uma das rotas apresentadas, será exemplificado um _mock_ de requisição.

#### POST /api/account

Adicionar uma nova conta.

##### Corpo da requisição:
```json
{
    "number": "123",
    "owner": "Proprietário",
    "balance": 0
}
```
A propriedade `balance` é opcional.

<br />

#### GET /api/account/[id]

Listar dados de uma conta.

##### Resposta:
```json
{
    "id": 1,
    "number": 123,
    "balance": 0,
    "owner": "Proprietário",
    "createdAt": "2021-06-20T22:45:25.718Z",
    "updatedAt": "2021-06-20T22:45:25.718Z"
}
```

<br />

#### GET /api/accounts

Listar todas as contas cadastradas.

##### Resposta:
```json
[
    {
        "id": 1,
        "number": 12345,
        "balance": 200,
        "owner": "Maria da Silva",
        "createdAt": "2021-06-20T17:37:47.438Z",
        "updatedAt": "2021-06-20T17:37:47.438Z"
    },
    {
        "id": 2,
        "number": 1234,
        "balance": 0,
        "owner": "João da Silva",
        "createdAt": "2021-06-20T17:37:59.239Z",
        "updatedAt": "2021-06-20T17:37:59.239Z"
    }
]
```

<br>

#### PUT /api/account/[id]

Alterar dados de uma conta existente.

##### Corpo da requisição:
```json
{
    "owner": "Proprietário 2",
}
```

<br>

#### DELETE /api/account/[id]

Remover uma conta existente.


<br>

#### GET /api/account/[id]/actions

Listar todas as ações de uma conta.
Nesse ponto, é importante ressaltar os tipos de ações que podem ser executadas, sendo eles:

`1 - Pagamento`
`2 - Saque`
`3 - Depósito`

##### Resposta:
```json
[
    {
        "id": 2,
        "description": "Saque",
        "value": 10,
        "type": 2,
        "createdAt": "2021-06-20T23:02:52.788Z",
        "updatedAt": "2021-06-20T23:02:52.788Z",
        "accountId": 2
    },
    {
        "id": 1,
        "description": "Depósito",
        "value": 100.5,
        "type": 3,
        "createdAt": "2021-06-20T23:02:28.344Z",
        "updatedAt": "2021-06-20T23:02:28.344Z",
        "accountId": 2
    }
]
```

#### POST /api/account/[id]/actions

Realizar uma ação em uma conta existente.

##### Corpo da requisição:
```json
{
    "description": "Saque",
    "value": 10,
    "type": 2
}
```

### Testes

Alguns poucos testes foram adicionados nessa API, porém, para executá-los, deve-se rodar o seguinte comando:
