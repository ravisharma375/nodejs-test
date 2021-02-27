const { Sales } = require("../../config/db");
class salesService {
	static async createSales(body) {
		try {
			const createSales = await Sales.create(body);
			if (createSales) {
				return true;
			}
		} catch (err) {
			console.log(err);
			throw new Error("Something went wrong");
		}
	}
	static async getAllSales() {
		try {
			const result = await Sales.findAll();
			if (!result) {
				return false;
			}
			return result;
		} catch (err) {
			throw new Error("Something went wrong");
		}
	}
	static async getAllSalesByAgentId(id) {
		try {
			const result = await Sales.findAll({
				where: {
					agentId: id,
				},
			});
			if (!result) {
				return false;
			}
			return result;
		} catch (err) {
			throw new Error("Something went wrong");
		}
	}
}
module.exports = salesService;
