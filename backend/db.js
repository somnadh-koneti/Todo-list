const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const schema_signup= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const schema=mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        minLength: 2,
        maxLength: 20,
        uppercase:true },
    description : String,
    completed :{
        type : Boolean,
        default : false
    }
});
const todo=mongoose.model('todos',schema);

const todo_signup_data=mongoose.model('user_accountinfo',schema_signup);

module.exports={todo_signup_data,todo}


