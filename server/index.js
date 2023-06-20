import Provider from './Models/ProviderSchema.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors());
app.use(express.json());
app.use(express.static('images'));
app.use(express.static('public'));


// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Specify the directory where the images will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname  + uniqueSuffix +"." + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });


mongoose.connect('mongodb://127.0.0.1:27017/mycart', { useNewUrlParser: true });

app.post('/insert', upload.single('image'), async (req, res) => {
  const addList = req.body;
  const image = req.file.filename; // Retrieve the uploaded image filename

  const p2 = new Provider({
    name: addList.name,
    price: addList.price,
    countInStock: addList.countInStock,
    providerEmail:addList.providerEmail,
    category:addList.category,
    description:addList.description,
    brand:addList.brand,
    tagName:addList.tagName,
    image: image, // Save the image filename in your database
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

app.get('/image/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.resolve('public/images', filename);
  res.sendFile(imagePath);
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

app.put('/update', upload.single('image'),async (req, res) => {
  
  const updatedItem = req.body;
  console.log(updatedItem)
  const image = req.file?.filename;
  const id = updatedItem.id
  
  try {

    await Provider.findByIdAndUpdate(updatedItem.id, {
      name: updatedItem.name,
      price: updatedItem.price,
      countInStock: updatedItem.countInStock,
      providerEmail:updatedItem.providerEmail,
      category:updatedItem.category,
      description:updatedItem.description,
      brand:updatedItem.brand,
      tagName:updatedItem.tagName,
      image: image
    }).then(data => {
      if (!data) {
        console.log({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else console.log({ message: "Product was updated successfully." });
    })
    .catch(err => {
      console.log({
        message: "Error updating Product with id=" + id
      });
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
