const User=require("../models/userModel")
const item=require("../models/itemsModel")

exports.addItem=async(req,res)=>{
   
        
        const itemOwner=await User.findById({_id:req.body.itemOwner}) //userName:Model/req.body... in postman
        const currentUserType=itemOwner.type
        console.log("///",itemOwner)
        console.log(currentUserType)
        if(currentUserType!=="admin"){
                    return res.status(404).json({message:"You are not an admin, you are not allowed to add items"})
                }   
        const newItem=await item.create({

        itemName:req.body.itemName, 
        itemImage:req.body.itemImage,
        itemPrice:req.body.itemPrice,
        itemQuantity:req.body.itemQuantity,
        itemOwner:req.body.itemOwner,
        itemType:req.body.itemType,
    })

    await itemOwner.updateOne({$push:{items:newItem._id}})



    return res.status(201).json({message:"item added",data:{newItem}})



    
  

}


 exports.deleteItem=async(req,res)=>{   
 const currentUser=await User.findOne({email:req.body.email})
 const currentUserType=currentUser.type
        if(currentUserType!=="admin"){
             return res.status(404).json({message:"You are not an admin, you are not allowed to delete items"})
         }   
        //  console.log(currentItem)
            try{
             await item.findByIdAndDelete(req.body.itemID)
             await currentUser.updateOne({$pull:{items:req.body.itemID}})

            
             return res.status(201).json({message:"item deleted successfully",data:{currentUser}})
            }
            catch(err){
                console.log(err)
            }
  

        }
 

 exports.buyItem=async(req,res)=>{
    const currentUser=await User.findOne({email:req.body.email})
    const currentUserBalance=currentUser.balance
    const currentItem=req.body.itemID
    const currentItemInfo=await item.findOne({_id:currentItem})
    const itemPrice=currentItemInfo.itemPrice
    const currentUserType=currentUser.type
           if(currentUserType!=="customer"){
                return res.status(404).json({message:"You are not a customer, you are not allowed to pruchase items"})
            }   

            const newBalance=currentUserBalance+itemPrice
            await currentUser.updateOne({$push:{items:currentItem}})
            await currentUser.updateOne({balance:newBalance})

            return res.status(201).json({message:"item bought successfully!"})
                // await currentUser.updateOne({$push:{balance:itemPrice}})
    

        }

 
        exports.removeItem=async(req,res)=>{
            const currentUser=await User.findOne({email:req.body.email})
            const currentUserBalance=currentUser.balance
            const currentItem=req.body.itemID
            const currentItemInfo=await item.findOne({_id:currentItem})
            const itemPrice=currentItemInfo.itemPrice
            const currentUserType=currentUser.type
                   if(currentUserType!=="customer"){
                        return res.status(404).json({message:"You are not a customer, you are not allowed to pruchase items"})
                    }   
        
                    const newBalance=currentUserBalance-itemPrice
                    await currentUser.updateOne({$pull:{items:currentItem}})
                    await currentUser.updateOne({balance:newBalance})
        
                    return res.status(201).json({message:"item removed successfully!"})
        
                   
        
        
                }


                exports.searchByType=async(req,res)=>{
                    try{
                    const ItemType=req.body.itemType;

                    const itemsSearch=await item.find({itemType:ItemType})
                    return res.status(201).json({message:"Items found are:",data:{itemsSearch}})
                    }
                    catch(err){
                        console.log(err)
                    }
                }


 ///search controller
 ///filter by type/price/...
 ///load 