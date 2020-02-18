# psp_desafio
Teste da PagarMe
-------------------------------------------------------------------------------------------------------------
Configuração e execução do container postgresql

Executar os comandos:
Na pasta .../psp_desafio/docker$ docker build -t ps_pagarme .
Subida do container ...$ docker run --rm -P -d --name pg_desafio ps_pagarme
Verificar a porta de conexão ...$ docker ps

Propriedades de conexão:
Host: localhost (para o ambiente de desenvolvimento ou IP do host que o container está sendo executado)
Port: Verificar através do comando "docker ps" onde o container está sendo executado.
Database: psp
User: pagarme
Password: zxcv1234 (Desenvolvimento)

Configuração do projeto:
Referenciar a porta de conexão com o banco: ...$/psp_desafio/config/config.json
    ...
    "port": "porta do container"
    ...

Comandos para geração dos modelos (Não é necessário execução, somente referência):
npx sequelize-cli model:generate --name Transaction --attributes valueTransaction:double,description:string,methodPayment:enum,cardNumber:string,name:string,dtValid:date,cvv:string
npx sequelize-cli model:generate --name Client --attributes name:string
npx sequelize-cli model:generate --name Payable --attributes status:enum,fee:double,valueLiquid:double,paymentDate:date

Geração das tabelas do banco de dados:
.../psp_desafio$ npx sequelize-cli db:migrate

Instação dos pacotes:
.../psp_desafio$ npm install

Subida do servidor:
.../psp_desafio$ npm run start

Execução dos testes:
.../psp_desafio$ npm run test

Referências para o desenvolvimento do desafio:
https://medium.com/crowdbotics/how-to-build-a-rest-api-with-nodejs-and-postgresql-828c7ec1e8b1
https://www.luiztools.com.br/post/como-usar-nodejs-mysql/
https://docs.docker.com/engine/examples/postgresql_service/
https://sequelize.org/master/manual/migrations.html
https://sequelize.org/v5/manual/getting-started.html
https://github.com/sequelize/sequelize/issues/6907
https://support.insomnia.rest/article/23-installation#ubuntu
https://gizmodo.uol.com.br/como-sao-criados-os-numeros-de-cartao-de-credito/
https://www.davidbaumgold.com/tutorials/automated-tests-node/
https://www.woolha.com/tutorials/sequelize-aggregate-functions-sum-count-min-max-etc-examples
https://stackoverflow.com/questions/41519695/how-to-get-a-distinct-value-of-a-row-with-sequelize#41529165
https://www.terlici.com/2015/09/21/node-express-controller-testing.html

curls:
Criando Cliente:
curl --request POST \
  --url http://localhost:8080/api/clients \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'name=Loja do Zé'

Lista de clientes:
curl --request GET \
  --url http://localhost:8080/api/clients

Criando uma transação:
curl --request POST \
  --url http://localhost:8080/api/clients/1/transactions \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data valueTransaction=1250.0 \
  --data 'description=Transaction ABC v.1.0' \
  --data methodPayment=credit_card \
  --data cardNumber=1234123412346789 \
  --data 'name=Joselito Alves' \
  --data dtValid=2022-04-01 \
  --data cvv=123

Lista de transações:
curl --request GET \
  --url http://localhost:8080/api/transactions

Sado disponível:
curl --request GET \
  --url http://localhost:8080/api/clients/1/payables/availbles

Saldo a receber:
curl --request GET \
  --url http://localhost:8080/api/clients/1/Payables/waitingfunds
