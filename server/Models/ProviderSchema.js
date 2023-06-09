import mongoose from "mongoose";

const providerSchema=mongoose.Schema({
    id:{
type:String
    },
    name:{
        type:String,
        required:[true,"please insert the name"]
    },
    countInStock:{
        type:Number
    },
    price:{
  type:Number,
  required:[true,"please insert the price"]
    },
    description:String,
    image:{
        type:String
    },
    catagory:{
        type:String
    },
    brand:{
    type:String},
    tagNumber:{
        type:String
    },
    providerEmail:{
        type:String
    }


});
    const Provider=mongoose.model("Provider",providerSchema);
    export default Provider;
    