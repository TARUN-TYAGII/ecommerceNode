const Order = require("../models/Order");
const Cart = require("../models/cart");
const Product = require("../models/Product");
const { sendOrderConfirmation } = require("../utils/email");

exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log({userId});
    const cart = await Cart.findOne({ userId }).populate("items.product");
    console.log({cart});
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = [];
    let total = 0;

    // Store cart items for email before clearing
    const cartItemsForEmail = [...cart.items];

    for (let item of cart.items) {
      const product = item.product;
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount: total,
    });

    // Clear cart after order creation
    cart.items = [];
    await cart.save();

    const emailBody = `
        <h2>Thanks for your order!</h2>
        <p>Total: ₹${total}</p>
        <ul>
          ${cartItemsForEmail
            .map((i) => `<li>${i.product.name} - Qty: ${i.quantity}</li>`)
            .join("")}
        </ul>
      `;
    
    try {
      await sendOrderConfirmation(
        "shivatyagii@outlook.com",
        "Order Confirmation",
        emailBody
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the order creation if email fails
    }

    res.status(201).json({ 
      message: "Order created successfully", 
      order 
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: error.message });
  }
};

// yeh project pura krna hai=>
// order (done)
// notification
// auth
// payment gateway (later)

// maths krna hai
// dsa revision + trees

// prso
// dsa and maths
// scaler interview prepration

// for in vs for of
