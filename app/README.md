# Poetize-server

## Sobre este projeto
Este é o back-end do [Poetize](https://github.com/LiamTX/Poetize).

É uma API RESTful construída com NodeJS + Express + MySQL que recebe todos os dados relacionados a poemas e registra / fornece ao cliente todos esses dados através de uma API REST.

Este projeto faz parte do meu portifólio pessoal, então, ficarei feliz se você pudesse me fornecer algum feedback sobre o projeto, código, estrutura ou qualquer coisa que possa me torar um dev melhor.

Email-me: liamcabral88@gmail.com

Se conecte comigo no [LinkedIn](www.linkedin.com/in/liamcabralteixeira)

## Getting Started
### Pré-requisitos
1 - Para executar este projeto no modo de desenvolvimento, você precisará ter um ambiente básico com NodeJS 8+ instalado.

2 - Crie uma conta no [Clever Cloud](https://www.clever-cloud.com/en/)(ou algum de sua preferencia) e crie um add-on MySQL e guarde as informações deste banco de dados.

3 - Crie uma conta no [Cloudinary](https://cloudinary.com/) caso queira utilizar a função de cadastro de avatars e guarde seu cloud name, api_key e api_secret.

### Instalação
#### Clonando o repositório
```
$ git clone https://github.com/LiamTX/poetize-server.git
$ cd poetize-server/app
```

#### Instalando dependências
```
$ yarn
```

ou

```
$ npm install
```

## Configuração
Com as dependências instaladas, crie o arquivo .env na raiz do projeto.

Nele crie as seguintes variaveis de ambiente: 
```
DB_HOST={host do seu db}
DB_USERNAME={username do seu db}
DB_PASSWORD={senha do seu db}
DB_DATABASE={seu db}

TOKEN_SECRET={palavra secreta para geração do seu token}

CLOUD_NAME={cloud name}
CLOUD_API_KEY={api_key}
CLOUD_API_SECRET={api_secret}
```

### Iniciando o projeto
Com todas as dependências e as configurações feitas, agora você pode executar a api:
```
npm run dev
```
