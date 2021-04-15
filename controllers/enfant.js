const httpError = require('../models/error');

const parent = require('../models/parent');
const enfant = require('../models/enfant');
const { validationResult } = require('express-validator');


const ajoutEnfant = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next
            (new httpError('invalid input passed ', 422));

    }

    const { nom, prenom, Dnaissance, parentId } = req.body;
    
    const createdEnfant= new enfant({

        nom,
        prenom,
        Dnaissance
    });

    let existingParent

    try{
        existingParent = await parent.findById(parentId)
    }catch (err) {
        const error = new httpError('problem !!!!!', 500);
        return next(error);
    }

   

    try {
        await createdEnfant.save();
        existingParent.enfants.push(createdEnfant)
        await existingParent.save()

       
    } catch (err) {
        const error = new httpError('failed signup', 500);
        return next(error);
    }

  
    res.status(201).json({ Enfant: createdEnfant });


}

const updateEnfant= async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next
            (new httpError('invalid input passed ', 422));
    }

    const { nom, prenom, Dnaissance} = req.body;
    const UserId = req.params.UserId
    let existingEnfant;

    try {
        existingEnfant = await enfant.findById(id)
    } catch {

        return next
            (new httpError('failed ', 500));
    }
    existingEnfant.nom = nom;
    existingEnfant.prenom = prenom;
    existingEnfant.Dnaissance = Dnaissance;
  


    try {
        existingEnfant.save()
    } catch {
        return next
            (new httpError('failed to save ', 500));
    }

    res.status(200).json({ existingEnfant: existingEnfant })
}





exports.ajoutEnfant=ajoutEnfant

exports.updateEnfant = updateEnfant