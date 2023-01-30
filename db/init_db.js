const { client } = require('./');
const { createUser } = require('./models/user');
const { createProduct } = require('./models/products');

async function dropTables() {
	try {
		const dropTablesQuery = `DROP TABLE IF EXISTS users;
								 DROP TABLE IF EXISTS products;
						 		 DROP TABLE IF EXISTS userProducts;`;

		await client.query(dropTablesQuery);
	} catch (error) {
		console.error('Error dropping tables');
		throw error;
	}
}

async function createTables() {
	try {
		const createTablesQuery = `
			CREATE TABLE users (
				id SERIAL PRIMARY KEY,
				email VARCHAR(255) UNIQUE NOT NULL,
				password VARCHAR(255) NOT NULL,
				"isAdmin" BOOLEAN DEFAULT false
			);

			CREATE TABLE products (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) UNIQUE NOT NULL,
				description VARCHAR(255) NOT NULL,
				price NUMERIC NOT NULL,
				stock INTEGER
			);

			CREATE TABLE userProducts (
				id SERIAL PRIMARY KEY,
				userId INTEGER NOT NULL,
				productId INTEGER NOT NULL
			);
    	`;

		await client.query(createTablesQuery);

	} catch (error) {
		console.error('Error creating tables');
		throw error;
	}
}

async function createUsers() {
	try {
		const users = [
			{ email: 'albert@gmail.com', password: 'bertie99' },
			{ email: 'sandra@gmail.com', password: 'sandra123' },
			{ email: 'glamgal@gmail.com', password: 'glamgal123' },
			{ email: 'admin@catco.com', password: 'admin123', isAdmin: true }
		];

		await Promise.all(users.map(createUser));
	} catch (error) {
		console.error('Error creating users');
		throw error;
	}
}

async function createProducts() {
	try {
		const products = [
			{
				name: 'Kitten Mittens',
				description: 'The perfect mittens for anyone who has a cold kitten.',
				price: 5.99,
				stock: 10,
			},
			{
				name: 'Dog Tail Snails',
				description: 'The best snails... put them on your dog\'s tail.',
				price: 5.99,
				stock: 50,
			},
			{
				name: 'President Joe Biden',
				description: 'The current president of The United States.',
				price: 4.20,
				stock: 5,
			},
			{
				name: 'Tacos',
				description: 'Estos tacos son los mejores tacos que jamás comerá en toda su existencia.',
				price: 1.50,
				stock: 14,
			},
			{
				name: 'Black Hole',
				description: 'The perfect solution to your existential crisis.',
				price: 100.00,
				stock: 1,
			},
		];

		await Promise.all(products.map(createProduct));
	} catch (error) {
		console.log('Error creating products');
		throw error;
	}
}

async function rebuild() {
	try {
		await client.connect();

		await dropTables();
		console.log('Tables dropped');

		await createTables();
		console.log('Tables created');

		await createUsers();
		console.log('Users created');

		await createProducts();
		console.log('Products created');
	} catch (error) {
		console.log('Error rebuilding data');
		throw error;
	}
}

rebuild()
	.catch(console.error)
	.finally(() => client.end());