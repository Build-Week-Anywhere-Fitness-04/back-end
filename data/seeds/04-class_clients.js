
const class_clients = require('../seed-data/class-clients');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('class_clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('class_clients').insert(class_clients);
    });
};
