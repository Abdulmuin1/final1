const express = require('express');
const app = express();
const mongoose = require('mongoose');
const abd=require('./cartModels')
app.use(express.json)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post("/product",async(req,res)=>{
  try{
const product= await abd.create(req.body)
res.status(200).json(product)
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
})
mongoose
  .connect('mongodb://127.0.0.1:27017/mycart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = 3001; // Set the desired port number
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
