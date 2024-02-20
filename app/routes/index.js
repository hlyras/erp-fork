const router = require("express").Router();
const lib = require('jarmlib');

const homeController = require("../controller/home");

router.get("/", lib.route.toHttps, homeController.index);

router.get("/login", lib.route.toHttps, homeController.login);
router.get("/signup", lib.route.toHttps, homeController.signup);
router.get("/logout", lib.route.toHttps, homeController.logout);

router.use("/user", require("./user"));
router.use("/admin", require("./admin"));
router.use("/tasker", require("./tasker"));
router.use("/department", require("./department"));
router.use("/product", require("./product"));
router.use("/production", require("./production"));
router.use("/feedstock", require("./feedstock"));
router.use("/customer", require("./customer"));
router.use("/mail", require("./mail"));
router.use("/sale", require("./sale"));
router.use("/ecommerce", require("./ecommerce"));
router.use("/financial", require("./financial"));
router.use("/documentation", require("./documentation"));
router.use("/goal", require("./goal"));

module.exports = router;