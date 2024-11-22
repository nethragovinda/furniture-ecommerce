const Joi = require("joi");

// Schema for signup validation
const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

module.exports = {
  signupSchema,
};
// Schema for login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

// Schema for adding a product to the cart
const cartSchema = Joi.object({
  productId: Joi.number().integer().positive().required().messages({
    "number.base": "Product ID must be a number",
    "number.positive": "Product ID must be positive",
    "any.required": "Product ID is required",
  }),
});

module.exports = {
  signupSchema,
  loginSchema,
  cartSchema,
};
