const moongoos = require("mongoose");

const bycrypt = require("bcryptjs");

const userSchema =  new moongoos.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },

    profileImageUrl: {
        type: String,
        default: null, 
    }


}, {timestamps : true} )


//Hash Password before saving 
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bycrypt.hash(this.password, 10);
    next();
})

// compare passwords 

userSchema.methods.comparePassword = async function (candidatePassword) {

    return await bycrypt.compare(candidatePassword, this.password);
}

module.exports = moongoos.model("User", userSchema);