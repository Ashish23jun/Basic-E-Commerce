const cron = require("node-cron");
const Order = require("../models/Order");
const transporter = require("../config/transporter"); // Ensure transporter is properly configured.

const sendOrderReminders = async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const pendingOrders = await Order.find({
      status: "Pending",
      createdAt: { $lt: twentyFourHoursAgo },
    }).populate("user");

    for (const order of pendingOrders) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: order.user.email,
        subject: "Order Reminder",
        text: `Your order #${order._id} has been pending for more than 24 hours. Please check your order status.`,
      });
    }
  } catch (error) {
    console.error("Order reminder cron error:", error);
  }
};

// Run every hour
cron.schedule("0 * * * *", sendOrderReminders);
