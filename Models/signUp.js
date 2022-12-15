const { model,Schema } = require('mongoose')

const signUp= new Schema({
    name:{type:String,required:true},
    phone: {type: Number,required: true},
    email:{type:String,required:true},
    randomPassword:{type:String,required:true},
    newPassword:{type:String, default: ''},
    verificationPasscode:{type:Number,required:true},
    accountStatus:{type:String},
    created_on:{ type: Date, default: Date.now },
})
module.exports.signUp = model("signUp",signUp)