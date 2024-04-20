const mongoose=require("mongoose");
const connectDB1=async()=>{
    try{
        mongoose.set('strictQuery',false);
        const conn1=await mongoose.connect(process.env.MONGODB_URI1);
        console.log(`Database 1 Connected: ${conn1.connection.host}`);
        

    }
    catch(err){
        console.log(err);
    }
}
module.exports=connectDB1;

