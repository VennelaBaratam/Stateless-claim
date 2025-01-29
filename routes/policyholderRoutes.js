const express = require('express');
const { createPolicyholder, getPolicyholderById, updatePolicyholder, deletePolicyholder } = require('../crud/policyholderCrud');
const Policyholder = require('../entities/policyholder');
const validatePolicyholder = require('../middleware/validatePolicyholder');

const router = express.Router();

router.post('/', validatePolicyholder, (req, res) => {
  const policyholder = new Policyholder(req.body.id, req.body.name, req.body.address);
  createPolicyholder(policyholder);
  res.status(201).send(policyholder);
});

router.get('/:id', (req, res) => {
  const policyholder = getPolicyholderById(req.params.id);
  res.send(policyholder);
});

router.put('/:id', validatePolicyholder, (req, res) => {
  const updatedPolicyholder = new Policyholder(req.body.id, req.body.name, req.body.address);
  updatePolicyholder(req.params.id, updatedPolicyholder);
  res.send(updatedPolicyholder);
});

router.delete('/:id', (req, res) => {
  deletePolicyholder(req.params.id);
  res.status(204).send();
});

module.exports = router;
