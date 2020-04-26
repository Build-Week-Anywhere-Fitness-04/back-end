const db = require('../db');

const findAll = () => db('classes');

const findBy = filter => db('classes').where(filter);

const findById = id => db('classes').where({ id }).first();

const add = async classToRegister => {
    try {
        const [id] = await db('classes').insert(classToRegister, 'id');    
        return findById(id);
    } catch (error) {
        console.log(error);
    }
    
}

const remove = id => db('classes').where({ id }).del();

const update = async (id, changes) => {
    const [resId] = await db('classes').where({ id }).update(changes, 'id');
    return findById(resId);
}

const registerClient = async (client_id, class_id) => {
    const [id] = await db('class_clients').insert({ class_id, client_id }, 'id');
    return findById(class_id);
}

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update,
    registerClient
}