var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('player', { title: 'Express' });
});

router.get('/ball', function(req, res, next) {
  res.render('ball');
});

module.exports = router;
