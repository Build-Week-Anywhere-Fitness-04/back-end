const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('clients route');
});

module.exports = router;