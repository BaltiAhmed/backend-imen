const mongoose =require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const schema = mongoose.Schema;

const parentsSchema = new schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    photo:{type:String,required:true},
    adresse:{type:String,required:true},
    tel:{type:String,required:true,minlength:8},
    actif:{type:String,required:true},
    enfants:[{type:mongoose.Types.ObjectId,required:true,ref:'enfant'}]

})

parentsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('parent',parentsSchema)