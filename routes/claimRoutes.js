const express = require('express');
const Claim = require('../models/claim');
const validateClaim = require('../middleware/validateClaim');

const router = express.Router();

router.post('/', validateClaim, async (req, res) => {
  try {
    const claim = new Claim(req.body);
    await claim.save();
    res.status(201).send(claim);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const claim = await Claim.findOne({ id: req.params.id });
    if (claim) {
      res.send(claim);
    } else {
      res.status(404).send({ error: 'Claim not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', validateClaim, async (req, res) => {
  try {
    const claim = await Claim.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (claim) {
      res.send(claim);
    } else {
      res.status(404).send({ error: 'Claim not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const claim = await Claim.findOneAndDelete({ id: req.params.id });
    if (claim) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: 'Claim not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
