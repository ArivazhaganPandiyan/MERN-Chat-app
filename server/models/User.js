const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlenth:3,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type: String,
            required: true,
            minlenth: 6,
        },
    },
    {timestamps:true}
);

module.exports = mongoose.model('User',userSchema); 