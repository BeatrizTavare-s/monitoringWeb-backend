# Monitoring Web

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge)

Uma aplicação desenvolvida em node, que permite o usuário cadastrar sites e aplicação irá monitorar a disponibilidade destes sites e e também exibir o histórico de monitoramento.

## Instalação

Para rodar a aplicação de forma local é necessário seguir um passo a passo

- Comece baixando o arquivo da aplicação do GitHub para a sua máquina local.

-  Instale as dependências

```bash
  npm install
```
  
- No arquivo .env é necessário configurar a variável de ambiente

MONGO_URI, uma configuração de exemplo:
MONGO_URI=mongodb://127.0.0.1:27017/dbMonitoring

-  Utilize o Docker Compose para subir a imagem da aplicação. Para isso, abra o terminal na pasta raiz do projeto e execute o comando docker-compose up. Esse comando irá baixar a imagem necessária e iniciar os  contêineres definidos no arquivo docker-compose.yml.

- Inicie a aplicação: Após a imagem Docker estar rodando, você pode iniciar a aplicação Node.js. No terminal, execute o comando para desenvolvimento
```bash
npm run dev
```
ou execute para fazer o build e subir a aplicação 
```bash
npm run start
```
