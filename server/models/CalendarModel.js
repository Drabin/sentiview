var db = require('../config/db');

db.knex.schema.hasTable('calendar').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('calendar', function (calendar) {
      calendar.increments('id').primary();
      calendar.integer('user');
      calendar.string('start');
      calendar.string('end');
      calendar.string('title');
      calendar.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var Calendar = db.Model.extend({
  tableName: 'calendar',
  hasTimestamps: true,
});

module.exports = Calendar;
