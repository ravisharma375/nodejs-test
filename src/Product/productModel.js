module.exports = function (sequelize, DataTypes) {
	const Product = sequelize.define(
		"product",
		{
			productId: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			productName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			categoryId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{
			updatedAt: "UpdatedAt",
			createdAt: "CreatedAt",
		},
	);
	return Product;
};
