const express = require('express');
const route = express.Router();

const parentControllers = require('../controllers/parent')

const {check} = require('express-validator')

route.post('/signup', 
check('nom')
.not()
.isEmpty(),
check('prenom')
.not()
.isEmpty(),
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8}),
check('adresse')
.not()
.isEmpty(),
check('tel')
.isLength({min:8})
, parentControllers.signup)


route.post('/login', 
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8})
, parentControllers.login)

route.post('/:id', 
check('nom')
.not()
.isEmpty(),
check('prenom')
.not()
.isEmpty(),
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8}),
check('adresse')
.not()
.isEmpty(),
check('tel')
.isLength({min:8})
, parentControllers.updateParent)

route.delete('/:id',parentControllers.deleteParent)

route.get('/',parentControllers.getParent)

route.get('/:id',parentControllers.getParent)

route.patch('/bloquer/:id',parentControllers.bloquerParent)

module.exports = route