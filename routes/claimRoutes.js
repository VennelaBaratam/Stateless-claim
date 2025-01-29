const express = require('express');
const { createClaim, getClaimById, updateClaim, deleteClaim } = require('../crud/claimCrud');
const Claim = require('../entities/claim');
const validateClaim = require('../middleware/validateClaim');

const router = express.Router();

router.post('/', validateClaim, (req, res) => {
  const claim = new Claim(req.body.id, req.body.policyId, req.body.amount, req.body.status);
  createClaim(claim);
  res.status(201).send(claim);
});

router.get('/:id', (req, res) => {
  const claim = getClaimById(req.params.id);
  res.send(claim);
});

router.put('/:id', validateClaim, (req, res) => {
  const updatedClaim = new Claim(req.body.id, req.body.policyId, req.body.amount, req.body.status);
  updateClaim(req.params.id, updatedClaim);
  res.send(updatedClaim);
});

router.delete('/:id', (req, res) => {
  deleteClaim(req.params.id);
  res.status(204).send();
});

module.exports = router;
