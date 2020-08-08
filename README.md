J.A Rio Militar - MONOLITIC ERP SYSTEM

1 - Ferramentas que estão sendo utilizadas no projeto:

Para o Front End

	EJS, CSS, JAVASCRIPT e JQUERY

Para o Back End

	NodeJS

Para Banco de Dados
	
	MySQL

Nenhum Framework está sendo utilizado, as funções genéricas estão sendo desenvolvidas
conforme necessidade de reutilização dos códigos, isto para manter a aplicação mais enxuta possível e com evolução 
constante baseada no modelo de negócios.

A arquitetura do Front-end está sendo desenvolvida baseada em partials, para evitar carregamento de código desnecessário para cada parte da aplicação.

A arquitetura do Back-end está sendo desenvolvida no modelo MVC, com sistema monolíto com estrutura baseada em API's REST para desacoplamento conforme evolução do projeto.

--------------------------------------------------

erp
	app
		controller
		models
		routes
		view
	bin
		www
	config
		database configuration
		library.js
		user connection (by Passport); 
	node_modules
		node modules used by the application
	public
		images
		javascript front-end codes (ajax and DOM manipulation)
	.env
	app.js
	package.json
	REAME.md


Caminho da ação do usuário até o retorno

View -> Route -> Controller -> Model -> Controller -> View

--------------------------------------------------

Caminho para 'Home Page'

Rota: /

Função: homeController.index

render: view/index

---------------------------------------------------

Caminho para 'Listar Produtos'

Clica em listar produtos na página de produtos (view)

Chama a Rota /product/list que chama (route)

A função productController.list que irá realizar todas as solicitações aos models (controller)

no caso buscará no model Product.list que irá retornar ao controller os produtos (model)

O controller irá enviar para o view os produtos retornados (controller)

Recebe a solicitação do Controller 'view/product/index' (view)


---------------------------------------------------

Próximas funcionalidades a serem implementadas (somente avançar para a próxima após concluir e testar o bloco anterior)


Financial filter by user;

Department and Roles Architecture and controllers
	Department
		Edit Section;
		Remove Section;
	Role
		Create Role (department foreign key);
		Edit Role (department foreign key); 
		Remove Role;

Admin Users controllers
	Edit Users Department and Roles setting the access to each one

Rework function to verify access

 - Seam controllers