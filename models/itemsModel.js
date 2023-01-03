const mongoose=require("mongoose")
const Schema=mongoose.Schema

const itemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        minlength:2,
        maxlength:20,
        trim:true,
        required:[true,"enter item name"]
    },

    itemImage:{
        type:String,
        required:[true,"enter corresponding image"]
    },

    itemPrice:{
        type:mongoose.Types.Decimal128,
        minlength:1,
        trim:true,
        required:[true,"enter item price"]

    },

    itemQuantity:{
        type:mongoose.Types.Decimal128,
        minlength:1,
        trim:true,
    },

    itemOwner:{
       
       type:Schema.Types.ObjectId,
       ref:'User'
        
    },

  
    itemType:{
        type:String
    }

},
{timestamps:true}
)

module.exports=mongoose.model("item",itemSchema)