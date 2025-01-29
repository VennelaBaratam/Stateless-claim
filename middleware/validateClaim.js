const { body, validationResult } = require('express-validator');
const { getPolicyById } = require('../crud/policyCrud');

const validateClaim = [
  body('id').isInt().withMessage('ID must be an integer'),
  body('policyId').isInt().withMessage('Policy ID must be an integer'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('status').isString().withMessage('Status must be a string'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const policy = getPolicyById(req.body.policyId);
    if (!policy) {
      return res.status(400).json({ errors: [{ msg: 'Policy not found' }] });
    }

    if (req.body.amount > policy.coverageAmount) {
      return res.status(400).json({ errors: [{ msg: 'Claim amount cannot exceed policy coverage amount' }] });
    }

    next();
  }
];

module.exports = validateClaim;
