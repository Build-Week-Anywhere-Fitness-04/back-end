const router = require('express').Router();
const Client = require('../../../data/models/clients');
const verifyClientId = require('../../middleware/verifyClientId');

router.use('/:id', verifyClientId);

router.use('/', (req, res, next) => {
    if (req.client) {
        next();
    } else {
        res.status(401).json({
            errorMessage: 'Invalid credentials'
        });
    }
});

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

// @route   GET /api/clients/:id
// @desc    Return an specific client
router.get('/:id', async (req, res, next) => {
    try {
        // req.client is defined in verifyClientId middleware
        res.json(req.client);
    } catch (error) {
        next(error);
    }
});


module.exports = router;