const cron = require("node-cron");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // Configure your email service
});

const monitorStock = async () => {
  try {
    const lowStockProducts = await Product.find({
      stock: { $lt: 10 },
      isDeleted: false,
    });

    if (lowStockProducts.length > 0) {
      const emailContent = lowStockProducts
        .map((product) => `${product.name}: ${product.stock} units remaining`)
        .join("\n");

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: "Low Stock Alert",
        text: `The following products are running low on stock:\n\n${emailContent}`,
      });
    }
  } catch (error) {
    console.error("Stock monitoring cron error:", error);
  }
};

// Run at midnight daily
cron.schedule("0 0 * * *", monitorStock);
