import mongoose from "mongoose";

const providerSchema=mongoose.Schema({
    Id:{
type:Number,
required:[true,"please insert the Id"]
    },
    name:{
        type:String,
        required:[true,"please insert the name"]
    },
    amount:{
        type:Number
    },
    price:{
  type:Number,
  required:[true,"please insert the price"]
    },
    description:String,
    image:{
        type:String
    }
});
    const Provider=mongoose.model("Provider",providerSchema);
    export default Provider;