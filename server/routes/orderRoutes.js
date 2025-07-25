// SERVER: /server/routes/orderRoutes.js
// -----------------------------------------------------------------------------

const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById } = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

module.exports = router;