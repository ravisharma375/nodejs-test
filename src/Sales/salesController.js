const Joi = require("joi");
const salesService = require("./salesService");
class salesController {
	static async createSale(req, res) {
		const { body } = req;
		const { id } = req.user;
		const salesSchema = Joi.object({
			name: Joi.string().required(),
			phone: Joi.string().required(),
			email: Joi.string().email().required(),
			permanentAddress: Joi.string().required(),
			presentAddress: Joi.string().required(),
			companyName: Joi.string().required(),
			companyAddress: Joi.string().required(),
			designation: Joi.string().required(),
			reference: Joi.string().required(),
			insurance_status_id: Joi.number().required(),
			insurance_type_id: Joi.number().required(),
		});
		try {
			const { error } = salesSchema.validate(body);
			if (error) {
				return res.json({
					status: false,
					message: error.message,
				});
			}
			body.agentId = id;
			const result = await salesService.createSales(body);
			if (result) {
				return res.json({
					status: true,
					message: "sales Add Successfully",
					data: "",
				});
			}
		} catch (err) {
			return res.json({
				status: true,
				message: "Something went Wrong",
				data: "",
			});
		}
	}
	static async getAllSales(req, res) {
		try {
			const data = await salesService.getAllSales();
			if (!data) {
				return res.json({
					status: false,
					message: "sales Not found",
					data: "",
				});
			}
			return res.json({
				status: true,
				data: data,
			});
		} catch (err) {
			return res.json({
				status: true,
				message: "Something went Wrong",
				data: "",
			});
		}
	}
	static async getSingleSales(req, res) {
		try {
		} catch (err) {
			return res.json({
				status: true,
				message: "Something went Wrong",
				data: "",
			});
		}
	}
	static async getAllSalesByAgentId(req, res) {
		const { id } = req.user;
		try {
			const data = await salesService.getAllSalesByAgentId(id);
			if (!data) {
				return res.json({
					status: false,
					message: "Sales Not found",
					data: "",
				});
			}
			return res.json({
				status: true,
				data: data,
			});
		} catch (err) {
			return res.json({
				status: true,
				message: "Something went Wrong",
				data: "",
			});
		}
	}
	static async editSales(req, res) {
		const { id } = req.user;
		try {
		} catch (err) {
			return res.json({
				status: true,
				message: "Something went Wrong",
				data: "",
			});
		}
	}
	static async deleteSales(req, res) {
		const { id } = req.user;
		try {
		} catch (err) {
			return res.json({
				status: true,
				message: "Something went Wrong",
				data: "",
			});
		}
	}
}
module.exports = salesController;
