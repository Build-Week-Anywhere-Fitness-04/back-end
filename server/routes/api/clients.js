const router = require('express').Router();
const Client = require('../../../data/models/clients');
const verifyClientId = require('../../middleware/verifyClientId');

router.use('/:id', verifyClientId);

// @route   GET /api/clients
// @desc    Return all clients
router.get('/', async (req, res, next) => {
    try {
        const clients = await Client.findAll();
        return res.json(clients);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/clients
// @desc    Return an specific client
router.get('/:id', async (req, res, next) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch (error) {
        next(error);
    }
});


module.exports = router;