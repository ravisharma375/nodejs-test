const { Product, Category } = require("../../config/db");
class productService {
	static async createProduct(body) {
		try {
			const findData = await Product.findOne({
				where: {
					productName: body.productName,
				},
			});
			if (findData) {
				return false;
			}
			body.category = body.categoryId;
			console.log(body);
			const createData = await Product.create(body);
			if (!createData) {
				return false;
			}
			return createData;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async editProduct(params, body) {
		console.log(params);
		try {
			const findData = await Product.findOne({
				where: {
					productId: params.productId,
				},
			});
			if (!findData) {
				return false;
			}
			const updateData = await Product.update(
				{ productName: body.productName, categoryId: body.categoryId },
				{
					where: {
						productId: params.productId,
					},
				},
			);

			if (updateData[0] == 0) {
				return false;
			}
			return updateData;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async deleteProduct(params) {
		try {
			const deleteData = await Product.destroy({
				where: {
					productId: params.productId,
				},
			});
			if (!deleteData) {
				return false;
			}
			return deleteData;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async getAllProduct(params) {
		try {
			const { page, size } = params;
			const limit = size ? +size : 10;
			const offset = page ? (page - 1) * limit : 0;
			// offset: offset,
			// limit: limit,
			// include: [
			// 	{
			// 		model: Category,
			// 		required: true,
			// 	},
			// ],
			// order: [["updatedAt", "DESC"]],
			const getData = await Product.aggregate([
				{
					$lookup: {
						from: "category",
						localField: "categoryId",
						foreignField: "_id",
						as: "Category",
					},
				},
			]);

			if (!getData) {
				return false;
			}
			return getData;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async getSingleProductByCategory(Id) {
		try {
			const getData = await Product.findOne({
				include: [
					{
						model: Category,
						required: true,
					},
				],
				where: {
					categoryId: Id,
				},
			});
			if (!getData) {
				return false;
			}
			return getData;
		} catch (err) {
			throw new Error(err);
		}
	}
}
module.exports = productService;
