const { link } = require("joi");
const { Category } = require("../../config/db");
class categoryService {
	static async createCategory(body) {
		try {
			const findData = await Category.findOne({
				where: {
					categoryName: body.categoryName,
				},
			});
			if (findData) {
				return false;
			}
			
			const createData = await Category.create(body);
			if (!createData) {
				return false;
			}
			return createData;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async editCategory(params, body) {
		try {
			const update = await Category.findOneAndUpdate(
				{ _id: params.categoryId },
				{ categoryName: body.categoryName },
				{ new: true },
			);
			console.log(update);
			if (!update) {
				return false;
			}

			// const updateData = await Category.update(
			// 	{ categoryName: body.categoryName },
			// 	{
			// 		where: {
			// 			categoryId: params.categoryId,
			// 		},
			// 	},
			// );

			// if (updateData[0] == 0) {
			// 	return false;
			// }
			return update;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async deleteCategory(params) {
		try {
			const deleteData = await Category.findOneAndDelete({
				_id: params.categoryId,
			});
			if (!deleteData) {
				return false;
			}
			return deleteData;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async getAllCategory(params) {
		try {
			const { page, size } = params;
			const limit = size ? +size : 10;
			const offset = page ? (page - 1) * limit : 0;
			// limit,
			// 	offset,
			// 	order: [["updatedAt", "DESC"]],
			const getData = await Category.find().limit(limit).skip(offset);
			if (!getData) {
				return false;
			}
			return getData;
		} catch (err) {
			throw new Error(err);
		}
	}
	static async getCategory() {
		try {
			// order: [["updatedAt", "DESC"]],
			const getData = await Category.find();
			if (!getData) {
				return false;
			}
			return getData;
		} catch (err) {
			throw new Error(err);
		}
	}
}
module.exports = categoryService;
