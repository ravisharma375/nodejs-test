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
			const findData = await Category.findOne({
				where: {
					categoryId: params.categoryId,
				},
			});
			if (!findData) {
				return false;
			}
			const updateData = await Category.update(
				{ categoryName: body.categoryName },
				{
					where: {
						categoryId: params.categoryId,
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
	static async deleteCategory(params) {
		try {
			const deleteData = await Category.destroy({
				where: {
					categoryId: params.categoryId,
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
	static async getAllCategory(params) {
		try {
			const { page, size } = params;
			const limit = size ? +size : 10;
			const offset = page ? (page - 1) * limit : 0;
			const getData = await Category.findAll({
				limit,
				offset,
				order: [["updatedAt", "DESC"]],
			});
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
			const getData = await Category.findAll({
				order: [["updatedAt", "DESC"]],
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
module.exports = categoryService;
