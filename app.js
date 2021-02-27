const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
require("dotenv").config();
const router = require("./router");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const auth = require("./config/auth");
// const categoryController = require("./src/Category/categoryController");
// const productController = require("./src/Product/productController");
const userController = require("./src/User/userController");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "L^m&SApi%Jk%",
		saveUninitialized: true,
		resave: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

auth.serializeUser();
auth.deserializeUser();
auth.configureStrategy();
var sessionFlash = (req, res, next) => {
	res.locals.error = req.flash("error");
	console.log(res.locals.error);
	next();
};
app.use(sessionFlash);
app.post(
	"/Login",
	passport.authenticate("local", {
		failureRedirect: "/Login?err",
		failureFlash: true,
	}),
	function (req, res) {
		const { user } = req;
		console.log("user");
		// if (user.role === "admin") {
		// 	sendResponse(0, user.id, res);
		// }
		// res.redirect("/");
	},
);
// Category Api Start ----------------------------------------------------------
// app.post("/category/create", categoryController.createCategory);
// app.put("/category/update/:categoryId", categoryController.editCategory);
// app.delete("/category/delete/:categoryId", categoryController.deleteCategory);
// app.get("/category/getcategory/:page/:size", categoryController.getAllCategory);
// Category Api End -------------------------------------------------------------
// Product api Start
// app.post("/product/create", productController.createProduct);
// app.put("/product/update/:productId", productController.editProduct);
// app.delete("/product/delete/:productId", productController.deleteProduct);
// Product Api End
//USER----------------------------------------------------------------
app.post("/user/create", userController.createUser);
app.get("/user", auth.ensureAdminAuthenticated, userController.getAllUser);
//USER----------------------------------------------------------------
app.use("/", router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen(() => {
	//console.log(`Node App Is Running on PORT ${process.env.PORT}`);
});
module.exports = app;
