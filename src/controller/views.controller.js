const CartsServices = require("../services/carts.services.js");
const cartsServices = new CartsServices();

const ProductsServices = require("../services/products.services.js");
const productsServices = new ProductsServices();

const socket = require("socket.io");

class ViewsController {
  async renderCart(req, res) {
    try {
      console.log("user:", req.user)
      const userCartId = req.user.cart;
      const newCart = await cartsServices.getCartById(
        userCartId, true
      );
      res.render("cart", {
        cart: JSON.stringify(newCart),
        active: { cart: true },
        user: req.user,
      });
    } catch (err) {
      console.log("err:", err);
      res.status(500).json({ message: "Server problems" });
    }
  }

  async renderProducts(req, res) {
    try {
      const products = await productsServices.getProducts(req.query);
      res.render("products", {
        products: products,
        active: { products: true },
        user: req.user,
      });
    } catch (err) {
      console.log("entre ene error");
      res.status(500).json({ error: err });
    }
  }

  async renderProduct(req, res) {
    const id = req.query.id;

    // const id = req.params.id;
    try {
      const product = await productsServices.getProductById(id);
      res.render("product", {
        product: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async renderLogin(req, res) {
    const error = req.query.error;
    try {
      if (error != undefined) {
        res.render("login", { error: true });
      } else {
        res.render("login");
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async renderRegister(req, res) {
    const error = req.query.error;
    try {
      if (req.user) {
        return res.redirect("/views/products");
      }
      if (error != undefined) {
        res.render("register", { error: true });
      } else {
        res.render("register");
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async renderRealtimeProducts(req, res) {
    var httpServer = req.httpServer;
    const io = socket(httpServer);
    try {
      io.on("connection", async (socket) => {
        socket.emit("products", await productsServices.getProducts(req.query));

        socket.on("deleteProduct", async (id) => {
          await productsServices.deleteProductById(id);
          io.sockets.emit(
            "products",
            await productsServices.getProducts(req.query)
          );
        });

        socket.on("addProduct", async (newProduct) => {
          const addResponse = await productsServices.addProduct(newProduct);
          if (addResponse == `Product already exists`) {
            io.sockets.emit("products", false);
          }
          io.sockets.emit(
            "products",
            await productsServices.getProducts(req.query)
          );
        });
      });
      res.render("realtimeproducts", { user: req.user });
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  }

  async test(req, res) {
    res.render("test", { user: req.user });
  }
}

module.exports = ViewsController;
