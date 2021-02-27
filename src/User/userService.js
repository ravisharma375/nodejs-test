const { User } = require("../../config/db");
class userService {
	static async createUser(body) {
		try {
			const result = await User.findOne({
				where: {
					userName: body.userName,
					panCard: body.panCard,
				},
			});
			if (result) {
				return false;
			}
			const createUser = await User.create(body);
			if (createUser) {
				return true;
			}
		} catch (err) {
			console.log(err);
			throw new Error("Something went wrong");
		}
	}
	static async getAllUser() {
		try {
			const result = await User.findAll();
			if (!result) {
				return false;
			}
			return result;
		} catch (err) {
			throw new Error("Something went wrong");
		}
	}
}
module.exports = userService;
