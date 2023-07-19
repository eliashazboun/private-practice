const mongoose =  require('mongoose');
const Joi = require('joi');


const Schema = mongoose.Schema;

const clientSchema = new Schema({
    first_name: {
        type:String,
        required: true,
        maLength: 255,
    },
    last_name: {
        type:String,
        required: true,
        maLength: 255,
    },
    birthday: {
        type: String,
        required: true,
        maxLength: 255,
    },

    phone : {
        type: String,
        required: true,
        maxLength: 255,
    },
    gender : {
        type:String,
        required: true,
        maxLength:50,
    },

    email: {
        type: String,
        requird: true,
        maxLength: 255,
        unique:true
    },

    appointments: {
        type: [String]
    },

    password: {
        type: String,
        required: true,
        maxLength: 1024
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});



const Client = mongoose.model('Client', clientSchema);



module.exports = Client;
