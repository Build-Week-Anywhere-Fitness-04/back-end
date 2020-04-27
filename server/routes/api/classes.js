const router = require('express').Router();
const Class = require('../../../data/models/classes');

// @route   GET /api/classes
// @desc    Return all classes
router.get('/', async (req, res, next) => {
    try {
        const classes = await Class.findAll();
        return res.json(classes);
    } catch (error) {
        next(error);
    }
});

module.exports = router;