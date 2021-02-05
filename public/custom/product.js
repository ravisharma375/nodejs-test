$(document).ready(function () {
	$("#AddProduct").on("submit", function (e) {
		e.preventDefault();
		$.ajax({
			url: "/product/create",
			method: "post",
			data: $(this).serialize(),
			success: (response) => {
				
				$("#error").append(` <div class="alert alert-success" role="alert">
                ${response.message}
              </div> `);
				setTimeout(() => {
					$("#error").empty();
					location.reload();
				}, 3000);
			},
			error: (response) => {
			
				$("#error").append(` <div class="alert alert-danger" role="alert">
                ${response.responseJSON.message}
              </div> `);
				setTimeout(() => {
					$("#error").empty();
				}, 3000);
			},
		});
	});
});
function editCategory(Id, productName, categoryId, categoryName) {
	
	$("#editModal1").modal("show");
	$("#productIdEdit").val(Id);
	$("#productNameEdit").val(productName);
	$("#selectProduct").val(`${categoryId}`);
	$("#EditProduct").on("submit", function (e) {
		e.preventDefault();
		$.ajax({
			url: "/product/update/" + Id,
			method: "PUT",
			data: $(this).serialize(),
			success: (response) => {
				
				$("#editError").append(` <div class="alert alert-success" role="alert">
                ${response.message}
              </div> `);
				setTimeout(() => {
					$("#editError").empty();
					location.reload();
				}, 3000);
			},
			error: (response) => {
			
				
				$("#editError").append(` <div class="alert alert-danger" role="alert">
                ${response.responseJSON.message}
              </div> `);
				setTimeout(() => {
					$("#editError").empty();
				}, 3000);
			},
		});
	});
}
function deleteCategory(Id) {
	$.ajax({
		url: "/product/delete/" + Id,
		method: "DELETE",
		success: (response) => {
			
			location.reload();
		},
	});
}
var path = document.location.pathname.split("/");
var page = !path[2] ? 1 : path[2];
var size = 10;

async function paginationNext() {
	page++;
	
	$("#page-item").text(page);
	$(location).attr("href", `/product/${page}/${size}`);
}
function paginationPrevious() {
	if (page > 1) {
		page--;
	}
	
	$("#page-item").text(page);
	$(location).attr("href", `/product/${page}/${size}`);
}

window.onload = function () {
	$("#page-item").text(page);
	$(".changePage").text(page);
};
