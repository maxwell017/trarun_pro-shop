import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/OrderModel.js";
import errorResponse from "../utils/errorResponse.js";

//@desc ctreate new order
//@route POST /api/orders
//@access public
export const createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new errorResponse("No order items", 400));
  }
  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      product: x._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createOrder);
});

//@desc get logged in user orders
//@route GET /api/orders/myOrders
//@access private
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders.length === 0) {
    return next(new errorResponse("No Orders Found!", 404));
  }
  res.status(200).json(orders);
});

//@desc get order by id
//@route GET /api/orders/:id
//@access private
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new errorResponse("No Order Found!", 404));
  }
  res.status(200).json(order);
});

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access private/admin
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  res.send("updateOrderToPaid");
});

//@desc update order to delivered
//@route PUT /api/orders/:id/delivered
//@access private/admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  res.send("updateOrderToDelivered");
});

//@desc get all orders
//@route PUT /api/orders/:id/pay
//@access private/admin
export const getAllOrders = asyncHandler(async (req, res, next) => {
  res.send("getAllOrders");
});