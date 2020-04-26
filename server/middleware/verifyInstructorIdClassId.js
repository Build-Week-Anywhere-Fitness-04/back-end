const Class = require('../../data/models/classes');

module.exports = async (req, res, next) => {
    try {
        const currentClass = await Class.findById(req.params.class_id);
        
        if (currentClass.instructor_id != req.params.id) {
            return res.status(401).json({
                errorMessage: 'Class ID passed in URL does not match with a class from this instructor'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}