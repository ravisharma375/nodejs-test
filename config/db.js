const Sequelize = require("sequelize");
const userModel = require("../src/User/userModel");
const salesModel = require("../src/Sales/salesModel");
const categoryModel = require("../src/Category/categoryModel");
const productModel = require("../src/Product/productModel");

const sequelize = new Sequelize(
	process.env.DB_NAME, //DataBase Name
	process.env.DB_USERNAME, //DataBase UserName
	process.env.DB_PASSWORD, //DataBase Password
	{
		host: process.env.HOST, //localhost
		port: process.env.DB_PORT, //DataBase Port No
		dialect: "postgres", //MYSQL DB
	},
);

const Category = categoryModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Sales = salesModel(sequelize, Sequelize);

sequelize.authenticate().then((err) => {
	if (err) {
		console.log(err);
	}
	console.log("DataBase Configure SuccessFully...");
});
sequelize
	.sync({ force: false })
	.then((result) => {
		console.log("sequelize is running");
	})
	.catch((err) => {
		console.log(err);
	});
module.exports = { Sequelize, Category, Product, User, Sales };
