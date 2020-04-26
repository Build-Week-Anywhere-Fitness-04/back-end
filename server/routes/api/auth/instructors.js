const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../../../utils/generateToken');

const Instructor = require('../../../../data/models/instructors');

// @route   /api/auth/instructors/register
// @desc    Register instructor
router.post('/register', async (req, res, next) => {
    try {
        // required fields
        const { username, password, first_name, last_name, email } = req.body;
        if (!username || !password || !first_name || !last_name || !email) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        let instructor = await Instructor.findBy({username});
        if (instructor.length) {
            return res.status(401).json({
                errorMessage: 'Username is already taken'
            });
        }

        // verify if email is valid 
        instructor = await Instructor.findBy({email});
        if (instructor.length) {
            return res.status(401).json({
                errorMessage: 'This email is registered already'
            });
        }

        // Hash password with bcrypt
        const hash = bcrypt.hashSync(password, 12);

        instructor = await Instructor.add({
            ...req.body,
            password: hash
        });

        res.status(201).json(instructor);
    } catch (error) {
        next(error);
    }
});

// @route   /api/auth/instructors/login
// @desc    Instructor login
router.post('/login', async (req, res, next) => {
    try {
        // required fields
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        // verify username
        const [instructor] = await Instructor.findBy({username});

        if (!instructor) {
            return res.status(401).json({
                errorMessage: 'Invalid username'
            });
        }

        // verify password
        if (!bcrypt.compareSync(password, instructor.password)) {
            return res.status(401).json({
                errorMessage: 'Invalid credentials'
            });
        }

        const token = generateToken({
            instructor: {
                id: instructor.id
            }
        });

        res.json({token});
    } catch (error) {
        next(err);
    }
});

module.exports = router;