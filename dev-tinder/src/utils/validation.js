const validator = require("validator");

const signupValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("First name is required");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter the strong password");
  }
};

const validateProfileEditData = (req) => {
  const allowedFields = ["age", "gender", "photoUrl", "about", "skills"];

  const isEditAllowed = Object.keys(req.body).every((k) =>
    allowedFields.includes(k),
  );

  const isURLValid = validator.isURL(req.body?.photoUrl);

  return { isEditAllowed, isURLValid };
};

module.exports = { signupValidation, validateProfileEditData };
