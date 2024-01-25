const Rank = [];

const soldado = {
	id: 1,
	name: "Soldado",
	image: "https://wt-images-cdn.sfo3.digitaloceanspaces.com/ja-images/ranks/r1.png",
	min_value: 0,
	max_value: 499.99,
	discount: 0,
	benefits: [
		{ description: "Acesso aos melhores preços da J.A Rio Militar®" },
		{ description: "Suporte personalizado dos consultores" },
		{ description: "Acesso ao Portal do Lojista" },
	]
};

const sargento = {
	id: 2,
	name: "Sargento",
	image: "https://wt-images-cdn.sfo3.digitaloceanspaces.com/ja-images/ranks/r2.png",
	min_value: 500,
	max_value: 999.99,
	discount: 0,
	benefits: [
		{ description: "Acesso aos melhores preços da J.A Rio Militar®" },
		{ description: "Suporte personalizado dos consultores" },
		{ description: "Acesso ao Portal do Lojista" },
		{ description: "Acesso à promoções recorrentes" },
		{ description: "Acesso antecipado aos lançamentos" },
		{ description: "Desconto de 1% nas compras à vista" }
	]
};

const capitao = {
	id: 3,
	name: "Capitão",
	image: "https://wt-images-cdn.sfo3.digitaloceanspaces.com/ja-images/ranks/r3.png",
	min_value: 1000,
	max_value: 2499.99,
	discount: 0,
	benefits: [
		{ description: "Acesso aos melhores preços da J.A Rio Militar®" },
		{ description: "Suporte personalizado dos consultores" },
		{ description: "Acesso ao Portal do Lojista" },
		{ description: "Acesso à promoções recorrentes" },
		{ description: "Acesso antecipado aos lançamentos" },
		{ description: "Desconto de 2% nas compras à vista" },
		{ description: "Produção de produtos na marca do comprador (mediante taxa)" }
	]
};

const coronel = {
	id: 4,
	name: "Coronel",
	image: "https://wt-images-cdn.sfo3.digitaloceanspaces.com/ja-images/ranks/r4.png",
	min_value: 2500,
	max_value: 4999.99,
	discount: 0,
	benefits: [
		{ description: "Acesso aos melhores preços da J.A Rio Militar®" },
		{ description: "Suporte personalizado dos consultores" },
		{ description: "Acesso ao Portal do Lojista" },
		{ description: "Acesso à promoções recorrentes" },
		{ description: "Acesso antecipado aos lançamentos" },
		{ description: "Desconto de 3% nas compras à vista" },
		{ description: "Opção de comprar parcelado no boleto (mediante critérios e taxas)" },
		{ description: "Compras parceladas no cartão de crédito sem taxa" },
		{ description: "Produção de produtos na marca do comprador (mediante taxa)" }
	]
};

const general = {
	id: 5,
	name: "General",
	image: "https://wt-images-cdn.sfo3.digitaloceanspaces.com/ja-images/ranks/r5.png",
	min_value: 5000,
	max_value: 9999.99,
	discount: 0,
	benefits: [
		{ description: "Acesso aos melhores preços da J.A Rio Militar®" },
		{ description: "Suporte personalizado dos consultores" },
		{ description: "Acesso ao Portal do Lojista" },
		{ description: "Acesso à promoções recorrentes" },
		{ description: "Acesso antecipado aos lançamentos" },
		{ description: "Compra parcelada no cartão de crédito sem taxa" },
		{ description: "Desconto de 4% nas compras à vista" },
		{ description: "Produção de produtos na marca do comprador (sem taxa)" },
		{ description: "Compra parcelada no boleto sem taxa" },
		{ description: "Kit de material publicitário J.A Rio Militar®" }
	]
};

const marechal = {
	id: 6,
	name: "Marechal",
	image: "https://wt-images-cdn.sfo3.digitaloceanspaces.com/ja-images/ranks/r6.png",
	min_value: 10000,
	max_value: 50000,
	discount: 0,
	benefits: [
		{ description: "Acesso aos melhores preços da J.A Rio Militar®" },
		{ description: "Suporte personalizado dos consultores" },
		{ description: "Acesso ao Portal do Lojista" },
		{ description: "Acesso à promoções recorrentes" },
		{ description: "Acesso antecipado aos lançamentos" },
		{ description: "Desconto de 5% nas compras à vista" },
		{ description: "Compra parcelada no cartão de crédito sem taxa" },
		{ description: "Compra parcelada no boleto sem taxa" },
		{ description: "Produção de produtos na marca do comprador (sem taxa)" },
		{ description: "Kit de material publicitário J.A Rio Militar®" },
		{ description: "Recebimento dos lançamentos J.A Rio Militar®" }
	]
};

Rank.push(soldado);
Rank.push(sargento);
Rank.push(capitao);
Rank.push(coronel);
Rank.push(general);
Rank.push(marechal);

module.exports = Rank;