const Joi = require("joi");
const userService = require("./userService");
class userController {
	static async createUser(req, res) {
		const { body } = req;
		const userSchema = Joi.object({
			name: Joi.string().required(),
			phone: Joi.string().required(),
			email: Joi.string().email().required(),
			permanentAddress: Joi.string().required(),
			presentAddress: Joi.string().required(),
			companyName: Joi.string().required(),
			companyAddress: Joi.string().required(),
			designation: Joi.string().required(),
			reference: Joi.string().required(),
			userName: Joi.string().required(),
			password: Joi.string().required(),
			adharCard: Joi.string().required(),
			panCard: Joi.string().required(),
			bankName: Joi.string().required(),
			Account: Joi.string().required(),
			dob: Joi.string().required(),
		});
		try {
			const { error } = userSchema.validate(body);
			if (error) {
				return res.json({
					status: false,
					message: error.message,
				});
			}
			const result = await userService.createUser(body);
			if (!result) {
				return res.json({
					status: false,
					message: "User Already Exist!",
				});
			}
			return res.json({
				status: true,
				message: "Register Successfully",
				data: "",
			});
		} catch (err) {
            
			return res.json({
				status: true,
				message: "Something went Wrong",
				data: "",
			});
		}
	}
	static async getAllUser(req, res) {
		try {
			const data = await userService.getAllUser();
			if (!data) {
				return res.json({
					status: false,
					message: "User Not found",
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
	static async getSingleUser(req, res) {
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
module.exports = userController;
