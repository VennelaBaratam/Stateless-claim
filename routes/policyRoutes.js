const express = require('express');
const Policy = require('../models/policy');
const validatePolicy = require('../middleware/validatePolicy');

const router = express.Router();

router.post('/', validatePolicy, async (req, res) => {
  try {
    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).send(policy);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const policy = await Policy.findOne({ id: req.params.id });
    if (policy) {
      res.send(policy);
    } else {
      res.status(404).send({ error: 'Policy not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', validatePolicy, async (req, res) => {
  try {
    const policy = await Policy.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (policy) {
      res.send(policy);
    } else {
      res.status(404).send({ error: 'Policy not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const policy = await Policy.findOneAndDelete({ id: req.params.id });
    if (policy) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: 'Policy not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
