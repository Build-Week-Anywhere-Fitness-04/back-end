const db = require('../db');

const findAll = () => db('instructors');

const findBy = filter => db('instructors').where(filter);

const findById = id => db('instructors').where({ id }).first();

const add = async client => {
    const [id] = await db('instructors').insert(client, 'id');
    return findById(id);
}

const remove = id => db('instructors').where({ id }).del();

const update = async (id, changes) => {
    const [resId] = await db('instructors').where({ id }).update(changes, 'id');
    return findById(resId);
}

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update
}