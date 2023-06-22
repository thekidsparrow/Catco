// The code is importing the Client class from the "pg" module, which is a PostgreSQL client for Node.js.
// The code sets up a connection string for connecting to a PostgreSQL database.
// There are two connection string options provided: one for Linux/Mac OS (commented out) and one for Windows.
// A new instance of the Client class is created using the connection string.
// The client object is exported as the default export of the module.

const { Client } = require("pg");

// Uncomment if on Linux/Mac OS
// const connString = "postgres://postgres:admin@localhost:5432/catco";

// Uncomment if on Windows
const connString = "postgresql://postgres:admin@localhost:5432/catco";

const client = new Client(connString);

module.exports = client;

// GitHub Actions Configuration
// No longer in use 06/21/2023
// const dbUrl = process.env.DATABASE_URL || connString;
//
// if (process.env.CI) {
//   client = new Client({
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "postgres",
//     database: "postgres",
//   });
// } else {
//   // local / heroku client config
// }