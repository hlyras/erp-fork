const router = require("express").Router();
const lib = require("jarmlib");

const saleController = require("../controller/sale/main");
const financialController = require("../controller/sale/financial");
const triageController = require("../controller/sale/triage");
const reportController = require("../controller/sale/report");
reportController.customer = require("../controller/sale/report/customer");
const prospectController = require("../controller/sale/prospect");
const serviceOrderController = require("../controller/sale/service-order");
const pickupController = require("../controller/sale/pickup");
const adminController = require("../controller/sale/admin");

const metricsController = require("../controller/sale/metrics/main");
metricsController.financial = require("../controller/sale/metrics/financial");

//API ROUTES
// sale controller
router.get("/", lib.route.toHttps, saleController.index);
router.get("/manage", lib.route.toHttps, saleController.manage);
router.post("/save", lib.route.toHttps, saleController.save);
router.get("/id/:id", lib.route.toHttps, saleController.findById);
router.post("/filter", lib.route.toHttps, saleController.filter);
router.get("/cancel/id/:id", lib.route.toHttps, saleController.cancel);

// admin controller
router.get("/admin", lib.route.toHttps, adminController.index);

// financial controller
router.get("/financial/payment", lib.route.toHttps, financialController.payment.index);
router.get("/financial/payment/confirm/:id", lib.route.toHttps, financialController.payment.confirm);
router.get("/financial/payment2/confirm/:id", lib.route.toHttps, financialController.payment2.confirm);
router.post("/financial/billet/confirm", lib.route.toHttps, financialController.billet.confirm);
// router.get("/financial/report", lib.route.toHttps, financialController.report.index);

// triage controller
router.get("/triage", lib.route.toHttps, triageController.index);

router.get("/triage/packment", lib.route.toHttps, triageController.packment.index);
router.post("/triage/packment/confirm", lib.route.toHttps, triageController.packment.confirm);

router.get("/nf", lib.route.toHttps, triageController.nf.index);
router.post("/nf/save", lib.route.toHttps, triageController.nf.save);
// router.get("/confirm-shipment/id/:id", lib.route.toHttps, triageController.confirmShipment);

// Service Order
router.get("/service-order", lib.route.toHttps, serviceOrderController.index);
router.get("/service-order/id/:id", lib.route.toHttps, serviceOrderController.findById);
router.post("/service-order/filter", lib.route.toHttps, serviceOrderController.filter);
// Service Order Shipment
router.get("/service-order/shipment", lib.route.toHttps, serviceOrderController.shipment.index);
router.post("/service-order/shipment/save", lib.route.toHttps, serviceOrderController.shipment.save);
router.get("/service-order/shipment/print/:id", lib.route.toHttps, serviceOrderController.shipment.print);
// Service Order Transport
router.get("/service-order/transport", lib.route.toHttps, serviceOrderController.transport.index);
router.post("/service-order/transport/save", lib.route.toHttps, serviceOrderController.transport.save);
// Service Order Collect
router.get("/service-order/collect", lib.route.toHttps, serviceOrderController.collect.index);
router.get("/service-order/collect/confirm/:id", lib.route.toHttps, serviceOrderController.collect.confirm);
router.get("/service-order/collect/cancel/:id", lib.route.toHttps, serviceOrderController.collect.cancel);
// Service Order Recept
router.post("/service-order/recept/confirm", lib.route.toHttps, serviceOrderController.recept.confirm);
// router.get("/service-order/recept/cancel/:id", lib.route.toHttps, serviceOrderController.recept.cancel);

router.get("/pick-up", lib.route.toHttps, pickupController.index);
router.get("/pick-up/recept", lib.route.toHttps, pickupController.recept.index);
router.get("/pick-up/deliver", lib.route.toHttps, pickupController.deliver.index);
router.get("/deliver/confirm/:id", lib.route.toHttps, pickupController.deliver.confirm);
router.get("/deliver/print/:id", lib.route.toHttps, pickupController.deliver.print);

// Métricas
router.get("/metrics", lib.route.toHttps, metricsController.index);

// Métricas
router.get("/metrics/financial", lib.route.toHttps, metricsController.financial.index);
router.post("/metrics/financial/filter", lib.route.toHttps, metricsController.financial.filter);

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