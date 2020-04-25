const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('classes route');
});

module.exports = router;