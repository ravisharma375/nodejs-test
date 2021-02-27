module.exports = function (sequelize, DataTypes) {
	const Sales = sequelize.define("sales", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		agentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
		insurance_status_id: {
			type: DataTypes.INTEGER,
		},
		insurance_type_id: {
			type: DataTypes.INTEGER,
		},
		status: {
			type: DataTypes.BOOLEAN,
		},
	});
	return Sales;
};
