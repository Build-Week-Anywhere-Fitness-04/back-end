const Instructor = require('../../data/models/instructors');

module.exports = async (req, res, next) => {
    const { id } = req.params;
    
    const instructor = await Instructor.findById(id);
    if (!instructor) {
        return res.status(401).json({
            errorMessage: 'Invalid ID'
        });
    }
    next();
}