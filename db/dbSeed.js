const { createUser } = require("./models/user");
const { createProduct } = require("./models/products");
const client = require("./client");

async function dropTables() {
  try {
    const dropTablesQuery = `DROP TABLE IF EXISTS users;
								 DROP TABLE IF EXISTS products;
						 		 DROP TABLE IF EXISTS userProducts;`;

    await client.query(dropTablesQuery);
  } catch (error) {
    console.error("Error dropping tables.");
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
    console.error("Error seeding tables.");
    throw error;
  }
}

async function createUsers() {
  try {
    const users = [
      { email: "albert@gmail.com", password: "bertie99" },
      { email: "sandra@gmail.com", password: "sandra123" },
      { email: "glamgal@gmail.com", password: "glamgal123" },
      { email: "admin@catco.com", password: "admin123", isAdmin: true },
    ];

    await Promise.all(users.map(createUser));
  } catch (error) {
    console.error("Error seeding users.");
    throw error;
  }
}

async function createProducts() {
  try {
    const products = [
      {
        name: "Kitten Mittens",
        description: "The perfect mittens for anyone who has a cold kitten.",
        price: 5.99,
        stock: 10,
      },
      {
        name: "Dog Tail Snails",
        description: "The best snails...",
        price: 5.99,
        stock: 50,
      },
      {
        name: "President Joe Biden",
        description: "The current president of The United States.",
        price: 4.2,
        stock: 5,
      },
      {
        name: "Tacos",
        description:
          "Estos tacos son los mejores tacos que jamás comerá en toda su existencia.",
        price: 1.5,
        stock: 14,
      },
      {
        name: "Black Hole",
        description: "The perfect solution to your existential crisis.",
        price: 100.0,
        stock: 1,
      },
    ];

    await Promise.all(products.map(createProduct));
  } catch (error) {
    console.log("Error seeding products.");
    throw error;
  }
}

async function Seed() {
  try {
    await client.connect();
    console.log("Connection established.");

    await dropTables();
    console.log("Tables dropped.");

    await createTables();
    console.log("Tables seeded.");

    await createUsers();
    console.log("Users seeded.");

    await createProducts();
    console.log("Products seeded.");
  } catch (error) {
    console.log("Error seeding database.");
    throw error;
  }
}

Seed()
  .catch(console.error)
  .finally(() => client.end());
