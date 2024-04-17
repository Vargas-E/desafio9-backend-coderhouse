const ProductsRepository = require("../repositories/products.repository.js");
const productsRepository = new ProductsRepository();
const { handleQueryString, checkNewProduct } = require("../utils/utils.js");

class ProductsService {
  async getProducts(queryObject) {
    const limit = queryObject.limit;
    const page = queryObject.page;
    const sort = queryObject.sort;
    const query = queryObject.query;
    let products;
    let args = {
      limit: limit || 10,
      page: page || 1,
      lean: true,
    };
    if (sort) {
      args.sort = { price: sort };
    }
    console.log(query ? { category: query } : {}, args);
    if (query) {
      products = await productsRepository.getProducts(
        { category: query },
        args
      );
    } else {
      products = await productsRepository.getProducts({}, args);
    }

    products.prevLink = handleQueryString(queryObject, products.prevPage);
    products.nextLink = handleQueryString(queryObject, products.nextPage);
    return products;
  }

  async getProductById(id) {
    const product = await productsRepository.getProductById(id);
    if (!product) {
      throw "Product not found";
    }
    console.log("Producto encontrado");
    return product;
  }

  async deleteProductById(id) {
    return await productsRepository.deleteProductById(id);
  }

  async addProduct(newProduct) {
    if (checkNewProduct(product)) {
      throw "All fields are required. Product invalid";
    }
    const productExists = await productsRepository.getProductByCode(
      product.code
    );
    if (productExists) {
      return "Product code already exists, Product code must be unique";
    }
    const product = await productsRepository.addProduct(newProduct);
    return product;
  }

  async updateProduct(id, productData) {
    const newProduct = await productsRepository.updateProduct(id, productData);

      if (!newProduct) {
        throw "Product to update not found";
      }
      console.log("Producto actualizado");
      return newProduct;
  }
}

module.exports = ProductsService;
