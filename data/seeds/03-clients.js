
const clients = require('../seed-data/clients');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert(clients);
    });
};
