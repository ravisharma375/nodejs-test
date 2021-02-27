const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../config/db");
const { Op } = require("sequelize");
module.exports.serializeUser = function () {
	passport.serializeUser(function (user, done) {
		done(null, user.userId);
	});
};

module.exports.deserializeUser = function () {
	passport.deserializeUser(async function (id, done) {
		try {
			const user = await User.findByPk(id, {});
			if (user) {
				// user.token = jwt.sign({ firstName: user.firstName, emailId: user.emailId }, secret, { expiresIn: '1d' })
				done(null, user);
			}
		} catch (err) {
			return done(err, false);
		}
	});
};

/**
 * Configure the strategy passport should use
 */
module.exports.configureStrategy = function () {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "userName",
				passwordField: "password",
			},
			async function (username, password, done) {
				console.log(username, password);
				const user = await User.findOne({
					where: {
						[Op.or]: [{ userName: username }, { email: username }],
					},
				});
				if (!user) {
					return done(null, false, { message: "User doesn't exist" });
				}
				if (!user.validatePassword(password, user.password)) {
					return done(null, false, { message: "Password does not match" });
				}
				return done(null, user);
			},
		),
	);
};

module.exports.ensureAuthenticated = function (req, res, next) {
	if (req.isAuthenticated() && req.user) {
		return next();
	}
	res.redirect("/login");
};

module.exports.ensureAdminAuthenticated = function (req, res, next) {
	if (req.isAuthenticated() && req.user.role == "ADMIN") {
		return next();
	}
	res.redirect("/login");
};

module.exports.ensureManagerAuthenticated = function (req, res, next) {
	if (req.isAuthenticated() && req.user.role == "USER") {
		return next();
	}
	res.redirect("/login");
};
//path to dashboard
module.exports.routes = [
	{
		path: "/dashboard",
	},
	{
		path: "/adminDashboard",
	},
];
