const express = require('express');
const router = express.Router();
const divisionService = require('./division.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.get('/:division', authorize(Role.Manager), getDivision); // only manager
module.exports = router;

function getDivision(req, res, next) {
    console.log('i am in', req.params.division);

    divisionService.getDivision(req.params.division)
        .then(users => res.json(users))
        .catch(err => next(err));
}
