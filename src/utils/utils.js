function handleQueryString(queryObject, value) {
  if (value) {
    const queryArr = Object.keys(queryObject).map((e) =>
      e == "page" ? `${e}=${value}` : `${e}=${queryObject[e]}`
    );
    console.log("queryString:", queryArr);
    if (!queryObject.page) {
      queryArr.push(`page=${value}`);
    }
    return "/api/products/view?" + queryArr.join("&");
  }
  return null;
}

function checkNewProduct(product) {
  const fields = ["title", "description", "price", "code", "stock", "category"];
  if (
    fields.every((e) => {
      return !!product[e];
    })
  ) {
    return true;
  }
  return false;
}

module.exports = { handleQueryString, checkNewProduct };
