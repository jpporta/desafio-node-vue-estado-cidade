# desafio-node-vue-estado-cidade

Este é um monorepo feito para rodar o backend node.js, frontend vue.js, mongoDB, e redis.

O objetivo desse projeto é concluir um desafio técnico.

Para rodar o projeto é necessário ter docker instalado e rodar o comando

```bash
docker-compose up
```

As portas que são utilizadas são:
- 8080: Para o frontend
- 3333: Para o backend
- 27017: Para o MongoDB
- 6379: Para o Redis

Para visualizar e utilizar a aplicação acesse:
http://localhost:8080/

Para visualizar a documentação da api acesse:
http://localhost:3333/api-docs/

Para esse projeto, como POC e como exemplo a seguinte chave de api é utilizada:

```
%7M!$)Y7A(Md25T@y2XXM0$ce$b4(k648mD%j0g%ptp(*UgA12
```
e para qualquer chamada ao backend deve utiliza-la no header com:
```
x-api-key: %7M!$)Y7A(Md25T@y2XXM0$ce$b4(k648mD%j0g%ptp(*UgA12
```
