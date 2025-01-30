const express = require('express');
const Policyholder = require('../models/policyholder');
const validatePolicyholder = require('../middleware/validatePolicyholder');

const router = express.Router();

router.post('/', validatePolicyholder, async (req, res) => {
  try {
    const policyholder = new Policyholder(req.body);
    await policyholder.save();
    res.status(201).send(policyholder);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const policyholder = await Policyholder.findOne({ id: req.params.id });
    if (policyholder) {
      res.send(policyholder);
    } else {
      res.status(404).send({ error: 'Policyholder not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', validatePolicyholder, async (req, res) => {
  try {
    const policyholder = await Policyholder.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (policyholder) {
      res.send(policyholder);
    } else {
      res.status(404).send({ error: 'Policyholder not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const policyholder = await Policyholder.findOneAndDelete({ id: req.params.id });
    if (policyholder) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: 'Policyholder not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
