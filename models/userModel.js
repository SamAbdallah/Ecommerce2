const mongoose=require("mongoose")
const Schema=mongoose.Schema
const bcrypt=require("bcrypt")


const userSchema=new mongoose.Schema({
 userName:{
    type:String,
    unique:true,
    required:[true,"please enter your username"], 
    trim:true,
    maxlength:12,
 },

 email:{
    type:String,
    required:[true,"please enter your email"],
    trim:true,
    unique:true,

 },

 password:{
    type:String,
    trim:true,
    minlength:8,
    maxlength:30
 
 },

 confirmPassword:{
   type:String,
   trim:true,
   minlength:8,
   maxlength:30,

 },

 type:{
  type:String,
  required:[true,"please enter user type"]

 },

 items:[{
   type:Schema.Types.ObjectId,
   ref:'item'
 }],

 balance:{
   type:Schema.Types.Decimal128,
   default:0.00,
 }





},
{timestamps:true}
)
userSchema.pre("save",async function(next){
  try {
    if(!this.isModified("password")){
      return next();
    }

    this.password=await bcrypt.hash(this.password,12)
    this.confirmPassword=undefined;
  }
  catch(err){

  }

})


userSchema.methods.checkPassowrd= async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
}
userSchema.methods.checkPassword = async function (
  candidatePassword, // Coming from the frontEnd as a plain text
  userPassword // Coming from the database as a hashed value
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};




module.exports=mongoose.model("User",userSchema)