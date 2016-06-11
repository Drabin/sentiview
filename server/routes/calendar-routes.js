var CalendarController = require('./../controllers/CalendarController.js');

module.exports = function(app) {
  app.get('/events', CalendarController.getEventsByUser);

  app.post('/events', CalendarController.createOrUpdate);

  // app.get('/userId', 
  // function(req, res) {
  //   console.log('############', req.user);
  //   if (req.user) {
  //     res.send(req.user.id);
  //     return;
  //   }
  //   res.status(400).end();
  // });
};