const express = require('express');
const route = express.Router();

const enfantControllers = require('../controllers/enfant')

const {check} = require('express-validator')

route.post('/ajout', 
check('nom')
.not()
.isEmpty(),
check('prenom')
.not()
.isEmpty(),
check('Dnaissance')
.not()
.isEmpty()
, enfantControllers.ajoutEnfant)

route.post('/:id', 
check('nom')
.not()
.isEmpty(),
check('prenom')
.not()
.isEmpty(),
check('Dnaissance')
.not()
.isEmpty()
, enfantControllers.updateEnfant)




/* route.get('/:id',enfantControllers.getEnfant) */

module.exports = route