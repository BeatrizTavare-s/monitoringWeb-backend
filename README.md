# Monitoring Web

Uma aplicação desenvolvida em node, que permite o usuário cadastrar sites e aplicação irá monitorar a disponibilidade destes sites e e também exibir o histórico de monitoramento.

## Instalação

Para rodar a aplicação de forma local é necessário seguir um passo a passo

- Comece baixando o arquivo da aplicação do GitHub para a sua máquina local.

-  Instale as dependências

```bash
  npm install
```
  
- No arquivo .env é necessário configurar a variável de ambiente

MONGO_URI, CRON_EXPRESSION uma configuração de exemplo:
```bash
MONGO_URI=mongodb://127.0.0.1:27017/dbMonitoring
CRON_EXPRESSION=*/10 * * * *
```
-  Utilize o Docker Compose para subir a imagem da aplicação. Para isso, abra o terminal na pasta raiz do projeto e execute o comando docker-compose up. Esse comando irá baixar a imagem necessária e iniciar os  contêineres definidos no arquivo docker-compose.yml.

- Inicie a aplicação: Após a imagem Docker estar rodando, você pode iniciar a aplicação Node.js. No terminal, execute o comando para desenvolvimento
```bash
npm run dev
```
ou execute para fazer o build e subir a aplicação 
```bash
npm run start
```
