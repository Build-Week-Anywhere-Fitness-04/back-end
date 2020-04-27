
const instructors = require('../seed-data/instructors');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructors').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert(instructors);
    });
};
