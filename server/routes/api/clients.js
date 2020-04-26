const router = require('express').Router();
const Client = require('../../../data/models/clients');
const Class = require('../../../data/models/classes');
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
        const client = await Client.findById(req.client.id);
        res.json(client);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/clients/:id/classes
// @desc    Return classes from an specific client
router.get('/:id/classes', async (req, res, next) => {
    try {
        const { client_id, class_id } = req.body;

        if (!client_id || !class_id) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        const classRegistered = await Class.registerClient(client_id, class_id);
        res.json(classRegistered);
    } catch (error) {
        next(error);
    }
});


// @route   POST /api/clients/:id/classes
// @desc    Client register to a class
router.post('/:id/classes', async (req, res, next) => {
    try {
        const classes = await Client.findClasses(req.client.id);
        res.json(classes);
    } catch (error) {
        next(error);
    }
});



module.exports = router;