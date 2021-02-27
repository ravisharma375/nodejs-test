const Sequelize = require("sequelize");
const userModel = require("../src/User/userModel");
const salesModel = require("../src/Sales/salesModel");
const categoryModel = require("../src/Category/categoryModel");
const productModel = require("../src/Product/productModel");

const sequelize = new Sequelize(
	"d3toqgtt1un5sk", //DataBase Name
	"kozmtukukzquev", //DataBase UserName
	"1aaee5bac90d84882f65bddd3f9fc2babe4cabcb534838b17ac884aab0a440c2", //DataBase Password
	{
		host: "ec2-18-204-74-74.compute-1.amazonaws.com", //localhost
		port: "5432", //DataBase Port No
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
