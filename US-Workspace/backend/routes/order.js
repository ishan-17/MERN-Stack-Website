const express = require("express");
const Order = require("../models/order");
const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(403)
        .json({ message: "Please provide loggedin user id" });
    }

    console.log("reqqqqqq", req.body);
    const order = await new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      totalPrice: req.body.totalPrice,
      shippingPrice: req.body.shippingPrice,
      taxAmount: req.body.taxAmount,
      user: userId,
    });

    await order.save();
    return res
      .status(201)
      .json({ message: "Order created successfully", data: order });
  } catch (error) {
    console.log("error in creating order", error);
    return res
      .status(500)
      .json({ message: error.message, status: error.status });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json({
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log("Error in fetching product detail", error);
    return res
      .status(500)
      .json({ message: error.message, status: error.status });
  }
});

router.get("/list/:userId", async (req, res) => {
  try {
    const userId = req.params.userId
    console.log("userId", userId)
    let orders = await Order.find({user: userId})
    orders = orders.map(e => {
        return {_id: e._id, order_date: e.createdAt, payment: e.paymentMethod}
    })

    console.log("orders", orders)
    
    res.json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
