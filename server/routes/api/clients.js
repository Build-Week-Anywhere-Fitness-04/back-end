const router = require('express').Router();
const Client = require('../../../data/models/clients');
const Class = require('../../../data/models/classes');
// midlewares
const verifyId = require('../../middleware/verifyClientId');
const verifyClassId = require('../../middleware/verifyClassId');
const verifyIdPermissionToClassId = require('../../middleware/verifyIdPermissionToClassId');
const verifyClientToken = require('../../middleware/verifyClientToken');

// Middleware that guarantees user logged in is a client
router.use('/', verifyClientToken);

router.use('/:id', verifyId);
router.use('/:id/classes/:class_id', verifyClassId);
router.use('/:id/classes/:class_id', verifyIdPermissionToClassId);


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
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/clients/:id
// @desc    Delete a client
router.delete('/:id', async (req, res, next) => {
    try {
        await Client.remove(req.params.id);
        res.json({
            message: 'Client removed successfully'
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/clients/:id
// @desc    Update a client
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // required fields
        const { username, password, first_name, last_name, email } = req.body;
        if (!username || !password || !first_name || !last_name || !email) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }
        const client = await Client.update(id, req.body);
        res.json(client);
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/clients/:id/classes
// @desc    Client register to a class
router.post('/:id/classes', async (req, res, next) => {
    try {
        const { class_id } = req.body;

        if (!class_id) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        // TODO check if client is already register in the class

        const classRegistered = await Class.registerClient(req.params.id, class_id);
        res.json(classRegistered);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/clients/:id/classes
// @desc    Return classes from an specific client
router.get('/:id/classes', async (req, res, next) => {
    try {
        const classes = await Client.findClasses(req.params.id);
        res.json(classes);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/clients/:id/classes/:class_id
// @desc    Return a specific class if client is registered in class
router.get('/:id/classes/:class_id', async (req, res, next) => {
    try {
        const { class_id } = req.params;
        const currentClass = await Class.findById(class_id);
        res.json(currentClass);
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/clients/:id/classes/:class_id
// @desc    Client remove class
router.delete('/:id/classes/:class_id', async (req, res, next) => {
    try {
        const { id, class_id } = req.params;
        await Client.removeClass(id, class_id);
        res.json({
            message: 'Class successfully deleted'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;