const router = require("express").Router();
const lib = require("jarmlib");

const saleController = require("../controller/sale/main");
const financialController = require("../controller/sale/financial");
const logisticsController = require("../controller/sale/logistics");
const reportController = require("../controller/sale/report");
const prospectController = require("../controller/sale/prospect");

//API ROUTES
// sale controller
router.get("/", lib.route.toHttps, saleController.index);
router.get("/manage", lib.route.toHttps, saleController.manage);
router.post("/save", lib.route.toHttps, saleController.save);
router.get("/id/:id", lib.route.toHttps, saleController.findById);
router.post("/filter", lib.route.toHttps, saleController.filter);
router.get("/cancel/id/:id", lib.route.toHttps, saleController.cancel);

// financial controller
router.get("/financial", lib.route.toHttps, financialController.index);
router.get("/confirm-payment/id/:id", lib.route.toHttps, financialController.confirmPayment);

// triage controller
router.get("/triage", lib.route.toHttps, logisticsController.index);
router.post("/confirm-packment", lib.route.toHttps, logisticsController.confirmPackment);
router.post("/confirm-nf", lib.route.toHttps, logisticsController.confirmNF);
router.get("/confirm-shipment/id/:id", lib.route.toHttps, logisticsController.confirmShipment);

// report controller
router.get("/report", lib.route.toHttps, reportController.index);
router.get("/report/product", lib.route.toHttps, reportController.product.index);
router.post("/report/product/filter", lib.route.toHttps, reportController.product.filter);
router.get("/report/packment", lib.route.toHttps, reportController.packment.index);
router.post("/report/packment/filter", lib.route.toHttps, reportController.packment.filter);
router.get("/report/customer", lib.route.toHttps, reportController.customer.index);
router.post("/report/customer/filter", lib.route.toHttps, reportController.customer.filter);

// prospect controller
router.get("/prospect", lib.route.toHttps, prospectController.index);

module.exports = router;