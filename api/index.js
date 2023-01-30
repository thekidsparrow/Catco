const apiRouter = require("express").Router();

// place your routers here

const usersRouter = require("./users");
apiRouter.use('/users', usersRouter);

const productsRouter = require("./products")
apiRouter.use("/products", productsRouter)

module.exports = apiRouter;
