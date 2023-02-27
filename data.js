const productsData = [
	{
		id: 0,
		name: "Notebook ACER V5",
		category: "computadoras",
		price: 1500,
		description: 'Notebook gamer HP Omen 16-b0507la negra sombra 16.1", Intel Core i5 11400H 8GB de RAM 512GB SSD, NVIDIA GeForce RTX 3050 1920x1080px Windows 11 Home',
		cardImg: "./assets/img/products/computadoras/notebook-hp-gamer001.webp",
	},
	{
		id: 1,
		name: "Nootebook Enova Cloudbook",
		category: "computadoras",
		price: 1040,
		description: 'Notebook Enova Cloudbook C141PP-A3S gris 14", Intel Celeron N3350 4GB de RAM 64GB SSD, Intel HD Graphics 500 1920x1080px Windows 10',
		cardImg: "./assets/img/products/computadoras/notebook-enova-gamer001.webp",
	},
	{
		id: 2,
		name: "Apple MacBook Pro ",
		category: "computadoras",
		price: 1740,
		description: 'Apple MacBook Pro (14 pulgadas, Chip M1 Pro de Apple con CPU de 8 núcleos,, 16 GB RAM, 512 GB SSD) - gris espacial',
		cardImg: "./assets/img/products/computadoras/notebook-apple-macbook-pro.webp",
	},
	{
		id: 3,
		name: "CPU Gamer Intel i5 16gb RAM ssd ",
		category: "computadoras",
		price: 1740,
		description: 'Computadora Pc Cpu Solarmax Intel Core I5 16gb 480 Ssd Wifi',
		cardImg: "./assets/img/products/computadoras/computadora-cpu-001.webp",
	},
	
];

const splitProducts = (size) => {
	let dividedProducts = [];

	for (let i = 0; i < productsData.length; i += size) {
		dividedProducts.push(productsData.slice(i, i + size));
	}
	return dividedProducts;
};

const productsController = {
	dividedProducts: splitProducts(6),
	nextProductsIndex: 1,
	productsLimit: splitProducts(6).length,
};
