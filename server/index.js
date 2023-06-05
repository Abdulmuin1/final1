import Provider from './Models/ProviderSchema.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mycart', { useNewUrlParser: true });

app.post('/insert', async (req, res) => {
  const addList = req.body.addList;

  const p2 = new Provider({
    name: addList.name,
    price: addList.price,
    amount: addList.amount,
    image: addList.img,
  });

  try {
    await p2.save();
    console.log('Data inserted successfully.');
    res.send('Data inserted successfully.');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error inserting data.');
  }
});

app.get('/getdata', async (req, res) => {
  try {
    const data = await Provider.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data.');
  }
});

app.put('/update', async (req, res) => {
  const updatedItem = req.body.item;
  console.log(req.body.item)

  try {
    await Provider.findByIdAndUpdate(updatedItem.id, {
      name: updatedItem.name,
      description: updatedItem.description,
      price: updatedItem.price,
      amount: updatedItem.amount,
      image: updatedItem.img,
    });

    console.log('Data updated successfully.');
    res.send('Data updated successfully.');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating data.');
  }
});
app.delete('/delete/:id',async(req,res)=>{
  const id=req.params.id
  await Provider.findByIdAndRemove(id).exec()
 
})

app.listen(3001, () => {
  console.log('App is running');
});
