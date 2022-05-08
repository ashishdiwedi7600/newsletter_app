const { model,Schema } = require('mongoose')

const imageGallery= new Schema({
    image:{type:String,required:true},
})
module.exports.gallery = model("imageGallery",imageGallery)