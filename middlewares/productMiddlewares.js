// const { validateName, validateQuantity } = require('../schemas/ProductSchema');

// const validateProduct = (req, res, next) => {
//   const { name, quantity } = req.body;

//   const validationName = validateName(name);
//   const validationQuantity = validateQuantity(quantity);

//   if (validationName.message) return res.status(422).json(validationName);
//   if (validationQuantity.message) return res.status(422).json(validationQuantity);

//   next();
// };

// module.exports = {
//   validateProduct,
// };
