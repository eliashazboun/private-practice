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
    gender : {
        type:String,
        required: true,
        maxLength:50,
    },

    username: {
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
    },

    phone:{
        type:[String],
        required: true,
        default: '2522221029'
    },
    emergency:{
        type:[{
            firstName:String,
            lastName:String,
            relationship:String,
            phone:String,
        }],
        default: {
            firstName:'Elias',
            lastName:'Hazboun',
            relationship:'Co Worker',
            phone: '2524698517'
        },
        required: false,
    },
    email: {
        type: [String],
        required: true,
        default: 'Testing@yahoo.com'
    }

    
});



const Client = mongoose.model('Client', clientSchema);



module.exports = Client;
