const router = require('express').Router();
// DB model functions
const Instructor = require('../../../data/models/instructors');
const Class = require('../../../data/models/classes');
// middlewares
const verifyId = require('../../middleware/verifyInstructorId');
const verifyClassId = require('../../middleware/verifyClassId');
const verifyClassFields = require('../../middleware/verifyClassRequiredFields');


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
router.use('/:id/classes/:class_id', verifyClassId);

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
router.post('/:id/classes', verifyClassFields, async (req, res, next) => {
    try {
        const registeredClass = await Class.add({
           instructor_id: req.params.id,
           ...req.body
        });
        res.status(201).json(registeredClass);
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/instructors/:id/classes/:class_id
// @desc    Edit a class
router.put('/:id/classes/:class_id', verifyClassFields, async (req, res, next) => {
    try {
        const { class_id } = req.params;

        // verify if class_id is a valid ID - MIDDLEWARE CREATED //TODO delete this after testing it
        // let currentClass = await Class.findById(class_id);
        // if (!classToEdit) {
        //     return res.status(401).json({
        //         errorMessage: 'Invalid class ID'
        //     });
        // }
        
        // update class
        const updatedClass = await Class.update(class_id, {
            id: class_id,
            ...req.body
        });
        res.status(200).json(updatedClass);
    } catch (error) {
        next(error);
    }
});

// TODO Remove class

// @route   DELETE /api/instructors/:id/classes/:class_id
// @desc    Delete a class
router.delete('/:id/classes/:class_id', async (req, res, next) => {
    try {
        const { class_id } = req.params;
        
        // delete class
        const response = await Class.remove(class_id);
        console.log(response); // TODO test it!!
        res.status(200).json({
            message: 'Class successfully deleted'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;