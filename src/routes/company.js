var express = require('express');
var findCompanyData = require('../controllers/company.controller.js');
var router = express.Router();

/* GET company contact information */
router.get('/contact', function(req, res, next) {
  findCompanyData(req, res, next);
});

module.exports = router;
