const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('clients auth route');
});

module.exports = router;