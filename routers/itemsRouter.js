const express=require("express")
const router=express.Router();
const itemController=require("../controllers/itemController")

router.post("/addItem",itemController.addItem)
router.post("/deleteItem",itemController.deleteItem)
router.post("/buyItem",itemController.buyItem)
router.post("/removeItem",itemController.removeItem)
router.post("/searchItem",itemController.searchByType)



module.exports=router 