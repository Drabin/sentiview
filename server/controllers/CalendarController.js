var Calendar = require('../models/CalendarModel.js');

module.exports = {

  getEventsByUser: function(req, res) {
    var user = req.user.id;
    Calendar
      .where({ user: user })
      .fetchAll()
      .then(function(events) {
        res.status(200).send(events)
      })
      .catch(function(err) { 
        res.send(err)
      });
  },

  createOrUpdate: function(req, res) {
    var event = req.body.event;
    var user = req.user.id;
    if (event.delete) {
      Calendar
        .where({ id: event.id })
        .destroy()
        .then(function(event) {
          res.status(200).end()
        })
        .catch(function(err) {
          res.send(err)
        });
      return;
    }
    var search = { start: event.start, end: event.end, title: event.title, user };
    if (event.id) search.id = event.id;
    new Calendar(search)
      .save()
      .then(function(event) {
        res.status(200).send(event); 
      })
      .catch(function(err) { 
        res.send(err); 
      });
  }
};
