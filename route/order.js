const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");
const { validateOrder } = require("../middleware/validation");

router.post("/", [auth, validateOrder], async (req, res) => {
  try {
    const order = new Order({
      user: req.user._id,
      products: req.body.products,
    });

    let totalAmount = 0;
    for (const item of req.body.products) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: "Invalid product or insufficient stock" });
      }
      totalAmount += product.price * item.quantity;

      // Update stock
      product.stock -= item.quantity;
      await product.save();
    }

    order.totalAmount = totalAmount;
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
      status: "Pending",
    });
    if (!order) {
      return res
        .status(404)
        .json({ error: "Order not found or cannot be deleted" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
