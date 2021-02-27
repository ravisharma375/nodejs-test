module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		permanentAddress: {
			type: DataTypes.STRING,
		},
		presentAddress: {
			type: DataTypes.STRING,
		},
		companyName: {
			type: DataTypes.STRING,
		},
		companyAddress: {
			type: DataTypes.STRING,
		},
		designation: {
			type: DataTypes.STRING,
		},
		reference: {
			type: DataTypes.STRING,
		},
		userName: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		adharCard: {
			type: DataTypes.STRING,
		},
		panCard: {
			type: DataTypes.STRING,
		},
		bankName: {
			type: DataTypes.STRING,
		},
		Account: {
			type: DataTypes.STRING,
		},
		dob: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.ENUM,
			values: ["USER", "ADMIN"],
		},
		status: {
			type: DataTypes.BOOLEAN,
		},
	});
	return User;
};
