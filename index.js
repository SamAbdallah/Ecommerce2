const express= require('express')
const app= express()
const DB=require("./database").connectDB
const authRouter=require("./routers/authRouter")
const itemsRouter=require("./routers/itemsRouter")
DB();
  

app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/items",itemsRouter)

app.listen(process.env.Port,()=>{
    console.log("listening on port 3100")
})
     