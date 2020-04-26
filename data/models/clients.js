const db = require('../db');

const findAll = () => db('clients');

const findBy = filter => db('clients').where(filter);

const findById = id => db('clients').where({ id }).first();

const add = async client => {
    const [id] = await db('clients').insert(client, 'id');
    return findById(id);
}

const remove = id => db('clients').where({ id }).del();

const update = async (id, changes) => {
    const [resId] = await db('clients').where({ id }).update(changes, 'id');
    return findById(resId);
}

const findClasses = client_id => db('classes').join('class_clients', { client_id });

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update,
    findClasses
}