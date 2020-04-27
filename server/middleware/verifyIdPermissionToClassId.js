const Class = require('../../data/models/classes');
const Client = require('../../data/models/clients');

module.exports = async (req, res, next) => {
    try {
        // get (istructor or client) id and class_id from params
        const { id, class_id } = req.params;

        if (req.client) { // logged as a client means client needs to be registered in the class passes through param
            const clientClass = await Client.findClassById(id, class_id);

            if (!clientClass) {
                return res.status(401).json({
                    errorMessage: 'Client is not registered in class passed in URL'
                });
            }
    
            next();
        } else if (req.instructor) { // logged as an instructor means instructor needs to be the instructor of the class passed through param
            const currentClass = await Class.findById(class_id);

            if (currentClass.instructor_id != id) {
                return res.status(401).json({
                    errorMessage: 'Class ID passed in URL does not match with a class from this instructor'
                });
            }
    
            next();
        }
    } catch (error) {
        next(error);
    }
}