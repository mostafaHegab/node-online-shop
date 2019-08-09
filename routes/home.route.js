const router = require("express").Router();

const homeController = require("../controllers/home.controller");

router.get("/", homeController.getHome);

module.exports = router;
