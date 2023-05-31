const mongoose=require('mongoose');
const cartSchema=mongoose.Schema({
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
// image:{
//     type:String
// }
},{
    timestamps:true
})
const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;