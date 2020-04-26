const router = require('express').Router();
const Instructor = require('../../../data/models/instructors');
const Class = require('../../../data/models/classes');
const verifyId = require('../../middleware/verifyInstructorId');

router.use('/', (req, res, next) => {
    if (req.instructor) {
        next();
    } else {
        res.status(401).json({
            errorMessage: 'Invalid credentials'
        });
    }
});

router.use('/:id', verifyId);

// @route   GET /api/instructors
// @desc    Return all instructors
router.get('/', async (req, res, next) => {
    try {
        const instructors = await Instructor.findAll();
        res.json(instructors);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/instructors/:id
// @desc    Return an instructor by id
router.get('/:id', async (req, res, next) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        res.json(instructor);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/instructors/:id/classes
// @desc    Return all classes by instructor
router.get('/:id/classes', async (req, res, next) => {
    try {
        const classes = await Instructor.findClasses(req.params.id);
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/instructors/:id/classes
// @desc    Add a new class
router.post('/:id/classes', async (req, res, next) => {
    try {
        const { name, type, start_time, location, intensity } = req.body;

        if (!name || !type || !start_time || !location || !intensity) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }
        
        const registeredClass = await Class.add({
           instructor_id: req.params.id,
           ...req.body
        });
        res.status(201).json(registeredClass);
    } catch (error) {
        next(error);
    }
});

// TODO Edit class
// TODO Remove class

module.exports = router;