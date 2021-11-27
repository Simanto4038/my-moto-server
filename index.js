const express = require('express')
const { MongoClient, Collection } = require('mongodb');
require('dotenv').config();


const app = express()
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;
const cors = require('cors');
var bodyParser = require('body-parser');


app.use(cors())
app.use(express.json())
// const db = require('db')
// db.connect({
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbopj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('**My Bike Shop**')
  })


  

async function run() {
    try {
      await client.connect();
      const database = client.db("MOTO-SHOP");
     // const allProductsCollection = database.collection("AllProducts");

      const orderCollection = database.collection("UserCart");
  
    
    
       /*********Post A  Dynamic Cart Document to Data base**********                      */

      app.post("/userOrder",async(req,res)=>
      {
        const order = req.body;
        console.log('Send Cart to DB' , order);
        const result = await  orderCollection.insertOne(order);
        console.log(`A Cart was inserted with the _id: ${result.insertedId}`);
        res.json(result)
       
      })

         app.get('/userOrder', async (req, res) => {

            const result = orderCollection.find({});
            const users = await result.toArray()
            res.send(users)
          })
    

     
    } finally {
     // await client.close();
    }
  }
  run().catch(console.dir);
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })