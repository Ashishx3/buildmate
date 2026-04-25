
import mongoose from "mongoose";


export async function connect() {
    try{
mongoose.connect(process.env.MONGO_URI)
const connection = mongoose.connection
  
connection.on('connected', ()=>{
    console.log('mongoDB Connected')
})

connection.on('error',(err)=>{
    console.log('MongoDB connection error, Please make sure db is UP and running' + err);
    process.exit()
})

    }
    catch(error){
        console.log('Something went Wrong in connect to db');
        console.log(error);
        
    }
}