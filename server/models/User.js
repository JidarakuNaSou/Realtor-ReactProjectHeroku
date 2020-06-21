const mongoose =require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name:{
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
    },
    phone : {
        type: String,
    },
    date: {
        type: Date,
        default : Date.now
    },
    user_id:{
        type: String,
    }
})

module.exports = User = mongoose.model("users",UserSchema)