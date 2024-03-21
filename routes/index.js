var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/books',require('./books'));
router.use('/authors',require('./authors'));
router.use('/users',require('./users'));
module.exports = router;
