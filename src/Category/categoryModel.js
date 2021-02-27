// module.exports = function (sequelize, DataTypes) {
// 	const Category = sequelize.define(
// 		"category",
// 		{
// 			categoryId: {
// 				type: DataTypes.UUID,
// 				primaryKey: true,
// 				defaultValue: DataTypes.UUIDV4,
// 			},
// 			categoryName: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 		},
// 		{
// 			updatedAt: "UpdatedAt",
// 			createdAt: "CreatedAt",
// 		},
// 	);
// 	return Category;
// };
const mongoose = require("mongoose");

const { Schema } = mongoose;
const category = new Schema({
	categoryName: String,
	time: {
		type: Number,
		default: new Date(),
	},
	
});
const Category = mongoose.model("category", category);
module.exports = Category;
