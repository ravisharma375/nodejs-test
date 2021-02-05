const Joi = require("joi");
const categoryService = require("./categoryService");
const productService = require("../Product/productService");
class categoryController {
	static async createCategory(req, res) {
		const { body } = req;
		const categorySchema = Joi.object({
			Id: Joi.allow(""),
			categoryName: Joi.string().required(),
		});
		try {
			const { error } = categorySchema.validate(body);
			if (error) {
				return res.status(400).json({
					message: error.message,
					data: "",
					error: true,
				});
			}
			const createCategory = await categoryService.createCategory(body);
			if (!createCategory) {
				return res.status(400).json({
					message: "Category Already Exist!",
					data: "",
					error: true,
				});
			}
			return res.status(200).json({
				message: "Category Created Successfully!",
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
	static async editCategory(req, res) {
		const { body, params } = req;
		const categorySchema = Joi.object({
			categoryName: Joi.string().required(),
		});
		try {
			const { error } = categorySchema.validate(body);

			if (error) {
				return res.status(400).json({
					message: error.message,
					data: "",
					error: true,
				});
			}
			const updateCategory = await categoryService.editCategory(params, body);
			if (!updateCategory) {
				return res.status(400).json({
					message: "Category Missing!",
					data: "",
					error: true,
				});
			}
			return res.status(200).json({
				message: "Updated Successfully!",
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
	static async deleteCategory(req, res) {
		const { params } = req;
		try {
			const findProduct = await productService.getSingleProductByCategory(
				params.categoryId,
			);
			// console.log(findProduct);
			if (findProduct) {
				return res.json({
					message: "please first Delete product belongs to this category!",
					data: "",
					error: true,
				});
			}
			const deleteData = await categoryService.deleteCategory(params);

			return res.json({
				message: "Category Deleted Successfully!",
				data: "",
				error: false,
			});
		} catch (err) {
			console.log(err)
			return res.json({
				message: "Something Went Wrong!",
				data: "",
				error: true,
			});
		}
	}
	static async getAllCategory(req, res) {
		const { params } = req;
		try {
			const getAllData = await categoryService.getAllCategory(params);
			if (!getAllData) {
				return res.status(400).json({
					message: "Data Not Found!",
					data: "",
					error: true,
				});
			}
			return res.json({
				message: "All Category!",
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
module.exports = categoryController;
