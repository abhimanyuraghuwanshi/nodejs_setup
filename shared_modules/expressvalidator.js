const { validationResult } = require("express-validator");
const response = require("./response");

const validateRequest = (validations) => {
  return async (req, res, next) => {
    // Check if req is empty or not an object
    if (
      typeof req !== "object" ||
      req === null ||
      Object.keys(req.body).length === 0
    ) {
      return res
        .status(400)
        .send(response(400, false, "Requested object-type invalid"));
    }

    // Run the specified validations
    await Promise.all(validations.map((validation) => validation.run(req)));
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(response(422, false, `${errors.errors[0].msg}`));
    }
    // If no validation errors, continue with the next middleware/route handler
    next();
  };
};

module.exports = validateRequest;
