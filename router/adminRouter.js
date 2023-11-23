const express = require("express");
const router = express.Router();
const { authenticate, adminRoleCheck } = require("../middlewares");
const adminController = require("../controllers/adminController");

router.get("/", authenticate, adminRoleCheck, adminController.getAllOrders);
// router.get('/orders', authenticate, ordersController.)
// router.post("/", authenticate, adminRoleCheck, ordersController.postOrders);
// router.patch(
//   "/",
//   authenticate,
//   adminRoleCheck,
//   ordersController.deleteProcedure
// );
// router.delete("/", authenticate, adminRoleCheck, ordersController.deleteOrder);

module.exports = router;
