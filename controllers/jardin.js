
const httpError = require('../models/error');

const jardin = require('../models/jardin');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken')



const signup = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next
            (new httpError('invalid input passed ', 422));

    }

    const { nom, email, password, description,adresse, tel } = req.body;
    let existingjardin;
    try {

        existingjardin = await jardin.findOne({ email: email })

    } catch (err) {
        const error = new httpError('problems!!!', 500);
        return next(error)
    }

    if (existingjardin) {
        const error = new httpError(
            'jardin exist',
            422
        );
        return next(error);
    }


    const createdJardin = new jardin({

        nom,
        email,
        password,
        description,
        adresse,
        logo: 'gfghh',
        nbr_employeur:0,
        date_creation: 'gghghg',
        tel,
        actif: true,
        confirmation:false

    });

    try {
        await createdJardin.save();
    } catch (err) {
        const error = new httpError('failed signup', 500);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { jardinId: createdJardin.id, email: createdJardin.email },
            'secret-thinks',
            { expiresIn: '1h' }
        );

    } catch (err) {
        const error = new httpError('failed signup try again later', 500);
        return next(error);

    }




    res.status(201).json({ jardin: createdJardin.id, email: createdJardin.email, token: token });


}


const login = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next
            (new httpError('invalid input passed', 422));
    }
    const { email, password } = req.body
    let existingJardin
    try {
        existingJardin = await jardin.findOne({ email: email })
    } catch {
        return next
            (new httpError('failed!!', 500));
    }
    if ((!existingJardin) || (existingJardin.password !== password)) {
        return next
            (new httpError('invalid input passed', 422))
    }

    if (existingJardin.confirmation === "false") {
        return next
            (new httpError('Compte en attente de confirmation par l admin', 422))
    }
    let token;
    try {
        token = jwt.sign(
            { userId: existingJardin.id, email: existingJardin.email },
            'secret-thinks',
            { expiresIn: '1h' }
        );

    } catch (err) {
        const error = new httpError('failed signup try again later', 500);
        return next(error);

    }
    res.status(200).json({ jardin: existingJardin, token: token })
}


const updateJardin = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next
            (new httpError('invalid input passed ', 422));
    }

    const { nom, email, password, description, nbr_employeur, tel } = req.body;
    const UserId = req.params.UserId
    let existingJardin;

    try {
        existingJardin = await jardin.findById(UserId)
    } catch {

        return next
            (new httpError('failed ', 500));
    }
    existingJardin.nom = nom;
    existingJardin.email = email;
    existingJardin.password = password;
    existingJardin.description = description;
    existingJardin.nbr_employeur = nbr_employeur;
    existingJardin.tel = tel;


    try {
        existingJardin.save()
    } catch {
        return next
            (new httpError('failed to save ', 500));
    }

    res.status(200).json({ existingJardin: existingJardin })
}


const deleteJardin = async (req, res, next) => {

    const UserId = req.params.UserId
    let existingJardin;
    try {
        existingJardin = await jardin.findById(UserId);
    } catch {

        return next
            (new httpError('failed', 500));
    }

    if (!existingJardin) {
        return next
            (new httpError('jardin does not exist', 500));


    }
    try {
        existingJardin.remove()
    } catch {

        return next
            (new httpError('failed', 500));
    }
    res.status(200).json({ message: "deleted" })
}

const getJardin = async (req, res, next) => {
    let existingJardin;
    try {
        existingJardin = await jardin.find({}, '-pasword')
    } catch {
        const error = new httpError('failed signup', 500);
        return next(error);
    }
    res.json({ existingJardin: existingJardin })
}

const getJardinById = async (req, res, next) => {
    const UserId = req.params.UserId
    let existingJardin;
    try {
        existingJardin = await jardin.findById(UserId)
    } catch {
        const error = new httpError('failed signup', 500);
        return next(error);
    }
    res.json({ existingJardin: existingJardin })
}


const bloquageJardin = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next
            (new httpError('invalid input passed ', 422));
    }

    const UserId = req.params.UserId
    let existingJardin;

    try {
        existingJardin = await jardin.findById(UserId)
    } catch {

        return next
            (new httpError('failed ', 500));
    }

    if (existingJardin.actif === true) {
        existingJardin.actif = false;
    } else {
        existingJardin.actif = true;
    }




    try {
        existingJardin.save()
    } catch {
        return next
            (new httpError('failed to save ', 500));
    }

    res.status(200).json({ existingJardin: existingJardin })
}


exports.signup = signup
exports.login = login
exports.updateJardin = updateJardin
exports.deleteJardin = deleteJardin
exports.getJardin = getJardin
exports.getJardinById = getJardinById
exports.bloquageJardin = bloquageJardin
