
# store-manager-api

Essa é uma API de estudo de um sistema de gerenciamento de
vendas onde será possível criar, visualizar, deletar e atualizar
produtos e vendas.


## O que é possível fazer?

Nela você poderá fazer um CRUD basico de produto através da
rota `/products` e de vendas através da rota `/sales`.
## Stack utilizada

**Back-end:**

* Node
* Express
* MongoDB
* Testes unitários Jest


## Instalação

Para usar essa api é necessário clonar o repositório `url`
seguindo os comandos abaixo.

### 1° Abra o terminal do seu sistema

```bash
  git clone git@github.com:JSouza27/Projeto-Store-Manager.git
```

### 2° Abra a pasta da API com o comando abaixo

```bash
  cd Projeto-Store-Manager
```

### 3° Agora instale as dependências com um dos comandos abaixo

```bash
  npm install
```

ou

```bash
  yarn install
```
### 4° Agora você pode abrir o projeto na IDE que preferir

*Caso use o vs code utilize o comando abaixo no terminal

```bash
  code .
```





## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as
seguintes variáveis de ambiente no seu .env e colocar o
endereço do seu banco local `mongodb`.

`MONGO_DB_URL=mongodb://localhost:${porta usada}/StoreManager`


## Documentação da API

### Rota de Produtos

#### Retorna todos os produtos

```http
  GET /products
```

Respota:

* Retorna um objeto com a chave `products` que é um array de produtos

```
    {
        "products": [
            {
                "_id": "61db3666b8423aac51eee543",
                "name": "product_name",
                "quantity": 10
            },
            {
                "_id": "61db374ab8423aac51eee544",
                "name": "product_name2",
                "quantity": 34
            },
            {
                "_id": "61db3764b8423aac51eee545",
                "name": "product_name3",
                "quantity": 150
            }
        ]
    }
```

#### Retorna um produtos por ID

```http
  GET /products/${product_id}
```
* Deve enviar o ID do produto por parâmetro

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer |

Respota:

* Retorna um objeto com as informações do produto

```
    {
        "_id": "61db374ab8423aac51eee544",
        "name": "product_name2",
        "quantity": 34
    }
```

#### Cria um novo produto

```http
  POST /products
```
* Deve enviar um objeto como abaixo via `Body`

```
    {
        "name": "product_name",
        "quantity": 10
    }
```

Resposta:

* Retorna status 201 com o objeto criado

```
    {
        "name": "product_name",
        "quantity": 10
    }
```

#### Atualizar o produto

```http
  PUT /products/${product_id}
```

* Deve enviar o ID do produto por parâmetro

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer |

* * Deve enviar um objeto com as informações atualizadas como abaixo via `Body`

```
    {
        "name": "product_name2",
        "quantity": 63
    }
```

Resposta:

* Retorna o objeto atualizado

```
    {
        "name": "product_name2",
        "quantity": 63
    }
```

#### Deleta um produto no banco

```http
  DELETE /products/${product_id}
```

* Deve enviar o ID do produto por parâmetro

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer |

Resposta:

* Retorna o objeto deletado

```
    {
        "_id": "61db3666b8423aac51eee543",
        "name": "product_name",
        "quantity": 10
    }
```

### Rota de Vendas

#### Retorna todos os produtos

```http
  GET /sales
```

Respota:

* Retorna um objeto com a chave `sales` que é um array de contendo todas as vendas salvas no banco

```
    {
        "sales": [
            {
                "_id": "61db3a13b8423aac51eee546",
                "itensSold": [
                    {
                        "productId": "61db374ab8423aac51eee544",
                        "quantity": 5
                    },
                    {
                        "productId": "61db3764b8423aac51eee545",
                        "quantity": 12
                    }
                ]
            },
            {
                "_id": "61db3a61b8423aac51eee547",
                "itensSold": [
                    {
                        "productId": "61db374ab8423aac51eee544",
                        "quantity": 2
                    }
                ]
            }
        ]
    }
```

#### Retorna uma venda por ID

```http
  GET /sales/${sale_id}
```
* Deve enviar o ID da venda por parâmetro

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer |

Respota:

* Retorna um objeto com as informações da venda

```
    {
        "sales": [
            {
                "_id": "61db3a61b8423aac51eee547",
                "itensSold": [
                    {
                        "productId": "61db374ab8423aac51eee544",
                        "quantity": 2
                    }
                ]
            }
        ]
    }
```

#### Cria uma nova venda

```http
  POST /sales
```
* Deve enviar um array de objetos como abaixo via `Body`

```
    [
        {
            "productId": "61db374ab8423aac51eee544",
            "quantity": 5
        },
        {
            "productId": "61db3764b8423aac51eee545",
            "quantity": 12
        }
    ]
```

Resposta:

* Retorna um objeto com as iformações da venda criada

```
    {
        "itensSold": [
            {
                "productId": "61db374ab8423aac51eee544",
                "quantity": 5
            },
            {
                "productId": "61db3764b8423aac51eee545",
                "quantity": 12
            }
        ],
        "_id": "61db3a13b8423aac51eee546"
    }
```

#### Atualizar uma venda

```http
  PUT /sales/${sale_id}
```

* Deve enviar o ID do produto por parâmetro

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer |

* * Deve enviar um objeto com as informações do produto atualizada como abaixo via `Body`

```
    [
        {
            "productId": "61db374ab8423aac51eee544",
            "quantity": 7
        }
    ]
```

Resposta:

* Retorna o objeto atualizado

```
    {
        "_id": "61db3a61b8423aac51eee547",
        "itensSold": [
            {
                "productId": "61db374ab8423aac51eee544",
                "quantity": 7
            }
        ]
    }
```

#### Deleta uma venda no banco de dados

```http
  DELETE /sales/${sale_id}
```

* Deve enviar o ID do produto por parâmetro

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer |

Resposta:

* Retorna o objeto deletado

```
    {
        "_id": "61db3a61b8423aac51eee547",
        "itensSold": [
            {
                "productId": "61db374ab8423aac51eee544",
                "quantity": 7
            }
        ]
    }
```
## Autor

- [@JSouza27](https://github.com/JSouza27)

