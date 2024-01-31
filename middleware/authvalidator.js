const { body } = require("express-validator");
const validateRequest = require("../shared_modules/expressvalidator");
const checkForInvalidCharacters = (value) => {
  const invalidChars = ['/', '\\', '"', "'",'>','<']; // Add characters to check here
  for (const char of invalidChars) {
    if (value.includes(char)) {
      throw new Error(`Text used cannot contain ${char}.`);
    }
  }
  return true;
};

exports.validateRegistration = validateRequest([
  body("first_name").notEmpty().isString().withMessage("first_name required as string!"),
  body("last_name").notEmpty().isString().withMessage("last_name required as string!"),
  body("password").notEmpty().isString().withMessage("password required! as string"),
  body("confirm_password").notEmpty().isString().withMessage("confirm_password required as string!"),
  body("email").notEmpty().isString().withMessage("email required as string!").isEmail().withMessage("invalid email format!"),
]);

exports.validateUserRequest = validateRequest([
  body("address").notEmpty().isString().withMessage("address required!"),
  body("signature").notEmpty().isString().withMessage("signature required!"),
]);
exports.validateLoginRequest = validateRequest([
  body("hash").notEmpty().isString().withMessage("hash required!"),
]);
exports.validateEmailLoginRequest = validateRequest([
  body("email").notEmpty().withMessage("email cannot be empty").isString().withMessage("email required!").custom(checkForInvalidCharacters),
  body("password").notEmpty().withMessage("password cannot be empty").isString().withMessage("password required!").custom(checkForInvalidCharacters),
]);
exports.validateChangePassword = validateRequest([
  body("password").notEmpty().withMessage("password cannot be empty").isString().withMessage("password required!").custom(checkForInvalidCharacters),
  body("confirm_password").notEmpty().withMessage("confirm_password cannot be empty").isString().withMessage("confirm_password required!").custom(checkForInvalidCharacters),
]);

exports.validateContactUs = validateRequest([
  body('name').notEmpty().withMessage('Name is required').custom(checkForInvalidCharacters),
  body('email').isEmail().withMessage('Invalid email address'),
  body('text').notEmpty().withMessage('Text message is required').custom(checkForInvalidCharacters),
  body('subject').notEmpty().withMessage('Subject is required').custom(checkForInvalidCharacters),
]);
