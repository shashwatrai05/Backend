// routes/busRoutes.js
import express from 'express';
import Bus from '../models/Bus.js';

const router = express.Router();

// Get all buses
router.get('/buses', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a bus by ID
router.get('/buses/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus == null) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new bus
router.post('/buses', async (req, res) => {
  const bus = new Bus({
    number: req.body.number,
    route: req.body.route,
    driverName: req.body.driverName,
    seatsAvailable: req.body.seatsAvailable,
    timings: req.body.timings
  });

  try {
    const newBus = await bus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a bus
router.put('/buses/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus == null) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    if (req.body.number != null) {
      bus.number = req.body.number;
    }
    if (req.body.route != null) {
      bus.route = req.body.route;
    }
    if (req.body.driverName != null) {
      bus.driverName = req.body.driverName;
    }
    if (req.body.seatsAvailable != null) {
      bus.seatsAvailable = req.body.seatsAvailable;
    }
    if (req.body.timings != null) {
      bus.timings = req.body.timings;
    }

    const updatedBus = await bus.save();
    res.json(updatedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bus
router.delete('/buses/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus == null) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    await bus.remove();
    res.json({ message: 'Bus deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
