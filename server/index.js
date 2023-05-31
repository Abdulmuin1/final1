import Provider from "./Models/ProviderSchema.js";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
//import { addListener } from "nodemon";

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/mycart', { useNewUrlParser: true });

app.post("/insert", async (req, res) => {
  const  addList=req.body.addList;
  const p2=new Provider(
    {name:addList.name,
    price:addList.price,
  amount:addList.amount,
image:addList.img}
  );
  try {
    await p2.save();
    console.log("The data is inserted");
    res.send("Data inserted successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error inserting data.");
  }
});
app.get("/getdata", async (req, res) => {
  try {
    const result = await Provider.find({});
    //console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


app.listen(3001, () => {
  console.log("App is running");
});
