const Sequelize = require("sequelize");
const categoryModel = require("../src/Category/categoryModel");
const productModel = require("../src/Product/productModel");

const sequelize = new Sequelize(
	process.env.DB_NAME, //DataBase Name
	process.env.DB_USERNAME, //DataBase UserName
	process.env.DB_PASSWORD, //DataBase Password
	{
		host: process.env.HOST, //localhost
		port: process.env.DB_PORT, //DataBase Port No
		dialect: "mysql", //MYSQL DB
	},
);

const Category = categoryModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);

Product.belongsTo(Category, { foreignKey: 'categoryId' });

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
module.exports = { Sequelize, Category, Product };
