const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const authGaurd = require("./guards/auth.guard");

const cartController = require("../controllers/cart.controller");

router.get("/", authGaurd.isAuth, cartController.getCart);

router.post(
    "/",
    authGaurd.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("amount")
        .not()
        .isEmpty()
        .withMessage("amount is required")
        .isInt({ min: 1 })
        .withMessage("amount must be grater then 0"),
    cartController.postCart
);

router.post(
    "/save",
    authGaurd.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("amount")
        .not()
        .isEmpty()
        .withMessage("amount is required")
        .isInt({ min: 1 })
        .withMessage("amount must be grater then 0"),
    cartController.postSave
);

router.post(
    "/delete",
    authGaurd.isAuth,
    bodyParser.urlencoded({ extended: true }),
    cartController.postDelete
);

module.exports = router;
