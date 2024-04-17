const express = require("express");
const router = express.Router();
const passport = require("passport");
const ViewsController = require("../controller/views.controller.js");
const viewsController = new ViewsController();

router.use(express.static("./src/public"));


// Middlewares
function authenticateJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (user) {
      return res.redirect("/views/products");
    } else {
      return next();
    }
  })(req, res, next);
}

function adminMiddleware(req, res, next) {
  if (req.user.rol == "admin") {
    next();
  } else {
    res.redirect("/views/products")
  }
}

function passportAuth(req, res, next) {
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/views/login",
  })(req, res, next);
}

// Routes
router.get(
  "/cart",
  passportAuth,
  viewsController.renderCart
);

router.get(
  "/products",
  passportAuth,
  viewsController.renderProducts
);

router.get(
  "/product",
  passportAuth,
  viewsController.renderProduct
);

router.get("/login", authenticateJWT, viewsController.renderLogin);

router.get("/register", authenticateJWT, viewsController.renderRegister);

router.get(
  "/realtime_products",
  passportAuth, adminMiddleware, 
  viewsController.renderRealtimeProducts
);

router.get("/profile", passportAuth, viewsController.renderProfile)

router.get("/test", passportAuth, adminMiddleware, viewsController.test)

module.exports = router;
