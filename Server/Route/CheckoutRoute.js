const express = require("express");
const router = express.Router();
const checkoutController = require("../Controller/Checkout/CheckoutController");
const {protect} = require("../middleware/authMiddleware")

// Create a checkout page (ImageKit handles the file upload)
router.post("/", protect ,checkoutController.createCheckoutPage);

// Get a specific checkout page
// router.post("/", protect ,checkoutController.createCheckoutPage);
router.get("/:id",protect, checkoutController.getCheckoutPage);

// Get all checkout pages for the current user
router.get("/", checkoutController.getUserCheckoutPages);

// Update a checkout page
router.patch("/:id", checkoutController.updateCheckoutPage);

// Delete a checkout page
router.delete("/:id", checkoutController.deleteCheckoutPage);

module.exports = router;