**API Rest - Controle de frotas de veículos**

**instalação das dependências**

`npm install`

**Iniciar o servidor**

`npm run dev`

**Registrar um usuário**
`METHOD: POST`
`URI: /user/register`
{
"name": "Mateus Roberto",
"email": "mateus@gmail.com",
"password": "123456"
}

**Cadastrar um veículo**
`METHOD: POST`
`URI: /vehicle`
{
	"type": "Motorcycle",
	"brand": "Honda",
	"model": "XRE 300",
	"year_model": "2018",
	"fuel": "Gasoline"
}

**Fazer login**
`METHOD: POST`
`URI: /signup`
{
"email": "mateus@gmail.com",
"password": "123456"
}

**Autenticação**

`JWT`
