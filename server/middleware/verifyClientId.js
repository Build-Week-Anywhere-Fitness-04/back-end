const Client = require('../../data/models/clients');

module.exports = async (req, res, next) => {
    const { id } = req.params;
    
    const client = await Client.findById(id);
    if (!client) {
        return res.status(401).json({
            errorMessage: 'Invalid ID'
        });
    }
    next();
}