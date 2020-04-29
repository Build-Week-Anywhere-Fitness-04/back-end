const JWT = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../../../utils/generateToken');

const Client = require('../../../../data/models/clients');

// @route   /api/auth/clients/register
// @desc    Register client
router.post('/register', async (req, res, next) => {
    try {
        // required fields
        const { username, password, first_name, last_name, email } = req.body;
        if (!username || !password || !first_name || !last_name || !email) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        let client = await Client.findBy({username});
        if (client.length) {
            return res.status(401).json({
                errorMessage: 'Username is already taken'
            });
        }

        // verify if email is valid 
        client = await Client.findBy({email});
        if (client.length) {
            return res.status(401).json({
                errorMessage: 'This email is registered already'
            });
        }

        // Hash password with bcrypt
        const hash = bcrypt.hashSync(password, 12);

        client = await Client.add({
            ...req.body,
            password: hash
        });

        res.status(201).json({
            id: client.id,
            username: client.username
        });
    } catch (error) {
        next(error);
    }
});

// Redirects user to Facebook for authentication. When complete,
// Facebook will redirect the user back to the application at 
//   /auth/facebook/callback
app.get('/auth/facebook', paspport.authenticate('facebook'));

// Facebook will redirect the user to thus URL after approval. Finish the
// authentication process by attempting to btain an access token. If
// access was granted, the user will be logged in. Otherwise,
// authentication was failed
app.get('/auth/facebook/callback', 
passport.authenticate('facebook', { successRedirect: '/',
                                    failureRedirect: '/login'}))

// @route   /api/auth/clients/login
// @desc    Client login
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
        const [client] = await Client.findBy({username});

        if (!client) {
            return res.status(401).json({
                errorMessage: 'Invalid username'
            });
        }

        // verify password
        if (!bcrypt.compareSync(password, client.password)) {
            return res.status(401).json({
                errorMessage: 'Invalid credentials'
            });
        }

        const token = generateToken({
            client: {
                id: client.id
            }
        });

        res.json({
            token,
            id: client.id
        });
    } catch (error) {
        next(err);
    }
});

module.exports = router;