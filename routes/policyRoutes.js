const express = require('express');
const { createPolicy, getPolicyById, updatePolicy, deletePolicy } = require('../crud/policyCrud');
const Policy = require('../entities/policy');

const router = express.Router();

router.post('/', (req, res) => {
  const policy = new Policy(req.body.id, req.body.policyholderId, req.body.coverageAmount);
  createPolicy(policy);
  res.status(201).send(policy);
});

router.get('/:id', (req, res) => {
  const policy = getPolicyById(req.params.id);
  res.send(policy);
});

router.put('/:id', (req, res) => {
  const updatedPolicy = new Policy(req.body.id, req.body.policyholderId, req.body.coverageAmount);
  updatePolicy(req.params.id, updatedPolicy);
  res.send(updatedPolicy);
});

router.delete('/:id', (req, res) => {
  deletePolicy(req.params.id);
  res.status(204).send();
});

module.exports = router;
