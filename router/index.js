const router = require("express").Router();

const categoryService = require("../src/Category/categoryService");
const productService = require("../src/Product/productService");

router.get("/category", async (req, res) => {
	const params = {
		page: 0,
		size: 10,
	};
	const data = await categoryService.getAllCategory(params);
	return res.render("category", {
		title: "Category",
		data: data,
	});
});
router.get("/", async (req, res) => {
	const params = {
		page: 0,
		size: 20,
	};
	const data = await productService.getAllProduct(params);
	const allCategory = await categoryService.getCategory();
	return res.render("product", {
		title: "Product",
		data: data,
		category: allCategory,
	});
});

router.get("/category/:page/:size", async (req, res) => {
	const { params } = req;
	//console.log(params);
	const data = await categoryService.getAllCategory(params);
	return res.render("category", {
		title: "Category",
		data: data,
	});
});
router.get("/product/:page/:size", async (req, res) => {
	const { params } = req;
	//console.log(params);
	const data = await productService.getAllProduct(params);
	const allCategory = await categoryService.getCategory();
	return res.render("product", {
		title: "Product",
		data: data,
		category: allCategory,
	});
});
module.exports = router;
