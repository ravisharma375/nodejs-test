module.exports = function (sequelize, DataTypes) {
	const Category = sequelize.define(
		"category",
		{
			categoryId: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			categoryName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			updatedAt: "UpdatedAt",
			createdAt: "CreatedAt",
		},
	);
	return Category;
};
