const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch("/admin/products/" + productId + '?_csrf=' + csrfToken,
{
      method: "DELETE",
    }); //domain name must be added before "/admin" if sending request to a different server

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove(); //DOM traversal to the "article" element in product-item.ejs
}

for (const element of deleteProductButtonElements) {
  element.addEventListener("click", deleteProduct);
}
