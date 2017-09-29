'use strict';

const express = require('express');
const session = require('express-session');
const uuid = require('uuid/v1');

var quiz = require('./mathquiz.js');

var app = express();
app.use(session({
  genid: function(req) {
    return uuid()
  },
  secret: 'galaxia'
}));

app.get('/problem/:operator/:digits', (req, res) => {
  quiz.problem(req.params.operator, req.params.digits, 2);
  req.session.quiz = quiz.dehydrate();
  res.send(req.session.quiz);
});

app.get('/solution/:answer', (req, res) => {
  quiz.hydrate(req.session.quiz);
  res.send({ solved: quiz.solve(req.params.answer) });
});

var port = 3000;
app.listen(port);
console.log(`listening on port ${port}`);
