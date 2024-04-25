function handleQueryString(queryObject, value) {
  if (value) {
    const queryArr = Object.keys(queryObject).map((e) =>
      e == "page" ? `${e}=${value}` : `${e}=${queryObject[e]}`
    );
    if (!queryObject.page) {
      queryArr.push(`page=${value}`);
    }
    return "/views/products?" + queryArr.join("&");
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
