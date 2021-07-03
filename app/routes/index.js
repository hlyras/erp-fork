const router = require("express").Router();
const lib = require('../../config/lib');

const homeController = require("../controller/home");

router.get("/", lib.routeToHttps, homeController.index);

router.get("/login", lib.routeToHttps, homeController.login);
router.get("/signup", lib.routeToHttps, homeController.signup);
router.get("/logout", lib.routeToHttps, homeController.logout);

router.use("/admin", require("./admin"));
router.use("/department", require("./department"));
router.use("/user", require("./user"));
router.use("/product", require("./product"));
router.use("/production", require("./production"));
router.use("/feedstock", require("./feedstock"));
router.use("/seam", require("./seam"));
router.use("/customer", require("./customer"));
router.use("/sale", require("./sale"));
router.use("/ecommerce", require("./ecommerce"));
router.use("/financial", require("./financial"));

module.exports = router;