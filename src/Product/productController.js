const Joi = require("joi");
const productService = require("./productService");
class productController {
	static async createProduct(req, res) {
		const { body } = req;
		const productSchema = Joi.object({
			Id: Joi.allow(""),
			productName: Joi.string().required(),
			categoryId: Joi.string().required(),
		});
		try {
			const { error } = productSchema.validate(body);
			if (error) {
				return res.status(400).json({
					message: error.message,
					data: "",
					error: true,
				});
			}
			const createProduct = await productService.createProduct(body);
			if (!createProduct) {
				return res.status(400).json({
					message: "Product Already Exist!",
					data: "",
					error: true,
				});
			}
			return res.status(200).json({
				message: "Product Created Successfully!",
				data: "",
				error: false,
			});
		} catch (err) {
			return res.status(400).json({
				message: "Something Went Wrong!",
				data: "",
				error: true,
			});
		}
	}
	static async editProduct(req, res) {
		const { body, params } = req;
		console.log(body);
		const productSchema = Joi.object({
			productName: Joi.string().required(),
			categoryId: Joi.string().required(),
			productId: Joi.string().required(),
		});
		try {
			const { error } = productSchema.validate(body);

			if (error) {
				return res.status(400).json({
					message: error.message,
					data: "",
					error: true,
				});
			}
			const updateProduct = await productService.editProduct(params, body);
			if (!updateProduct) {
				return res.status(400).json({
					message: "Product Missing!",
					data: "",
					error: true,
				});
			}
			return res.status(200).json({
				message: "Product Updated Successfully!",
				data: "",
				error: false,
			});
		} catch (err) {
			return res.status(400).json({
				message: "Something Went Wrong!",
				data: "",
				error: true,
			});
		}
	}
	static async deleteProduct(req, res) {
		const { params } = req;
		try {
			const deleteData = await productService.deleteProduct(params);
			if (!deleteData) {
				return res.json({
					message: "Something Went Wrong!",
					data: "",
					error: true,
				});
			}
			return res.json({
				message: "Product Deleted Successfully!",
				data: "",
				error: false,
			});
		} catch (err) {
			return res.json({
				message: "Something Went Wrong!",
				data: "",
				error: true,
			});
		}
	}
	static async getAllProduct(req, res) {
		const { params } = req;
		try {
			const getAllData = await productService.getAllProduct(params);
			if (!getAllData) {
				return res.status(400).json({
					message: "Data Not Found!",
					data: "",
					error: true,
				});
			}
			return res.json({
				message: "All Product!",
				data: getAllData,
				error: false,
			});
		} catch (err) {
			return res.json({
				message: "Something Went Wrong!",
				data: "",
				error: true,
			});
		}
	}
}
module.exports = productController;
