// module.exports = function (sequelize, DataTypes) {
// 	const Product = sequelize.define(
// 		"product",
// 		{
// 			productId: {
// 				type: DataTypes.UUID,
// 				primaryKey: true,
// 				defaultValue: DataTypes.UUIDV4,
// 			},
// 			productName: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			categoryId: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 			},
// 		},
// 		{
// 			updatedAt: "UpdatedAt",
// 			createdAt: "CreatedAt",
// 		},
// 	);
// 	return Product;
// };
const mongoose = require("mongoose");
const { Schema } = mongoose;
const product = new Schema({
	productName: String,
	categoryId: String,
	category: { type: Schema.Types.ObjectId, ref: "Category" },
});
const Product = mongoose.model("product", product);
module.exports = Product;
