const { body, validationResult } = require('express-validator');

const validatePolicy = [
  body('id').isInt().withMessage('ID must be an integer'),
  body('policyholderId').isInt().withMessage('Policyholder ID must be an integer'),
  body('coverageAmount').isFloat({ gt: 0 }).withMessage('Coverage amount must be a positive number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validatePolicy;
