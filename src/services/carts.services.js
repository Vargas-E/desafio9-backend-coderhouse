const CartsRepository = require("../repositories/carts.repository.js");
const cartsRepository = new CartsRepository();

class CartsServices {
  async getCartById(id) {
    return await cartsRepository.getCartById(id);
  }

  async createCart() {
    return await cartsRepository.createCart();
  }

  async deleteProductsFromCart(cid) {
    const cart = await cartsRepository.getCartById(cartId);
    if (!cart) {
      throw "Cart to update not found";
    } else {
      await cartsRepository.updateCart(cart);
      return cart;
    }
  }

  async addToCart(cid, pid, quantity) {
    const cart = await cartsRepository.getCartById(cid);
    if (!cart) {
      throw "Cart to update not found";
    }
    const productExists = cart.products.find(
      (product) => product.product.toString() == productId
    );
    if (productExists) {
      productExists.quantity = productExists.quantity + quantity;
    } else {
      cart.products.push({ product: productId, quantity: quantity });
    }
    cart.markModified("products");
    await cart.save();
    return cart;
  }

  async deleteFromCart(cartId, productId) {
    const cart = await cartsRepository.getCartById(cartId);
    if (!cart) {
      throw "Cart to update not found";
    } else {
      cart.products = cart.products.filter((e) => e.product != productId);
      cart.markModified("products");
      await cart.save();
      return cart;
    }
  }

  async addProductsToCart(cartId, products) {
    const cart = await cartsRepository.getCartById(cartId);
    if (!cart) {
      throw "Cart to update not found";
    }
    const productsToSend = products.map((e) => {
      return { product: e._id, quantity: e.quantity || 1 };
    });
    productsToSend.forEach((product) => {
      const productExists = cart.products.find(
        (a) => a.product.toString() == product.product
      );
      if (productExists) {
        productExists.quantity = productExists.quantity + product.quantity;
      } else {
        cart.products.push(product);
      }
    });
    cart.markModified("products");
    await cart.save();
    return cart;
  }
}

module.exports = CartsServices;
