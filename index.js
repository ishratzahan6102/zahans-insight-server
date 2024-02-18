const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const { query } = require('express');

// .env er jonno config
require('dotenv').config()
const app = express()

// middle ware
app.use(cors())
app.use(express.json())

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.feigjta.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.feigjta.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const articlesCollection = client.db("zahansinsight").collection("allArticles")
    const mostPopularCollection = client.db("zahansinsight").collection("mostPopular");

    app.get('/allArticles', async (req, res) => {
      const query = {}
      const result = await articlesCollection.find(query).toArray()
      res.send(result)
    })
    app.get('/allArticles', async (req, res) => {
      const category = req.query.category;
      const query = {
        category: category
    };
    const result = await articlesCollection.find(query).toArray();
    res.send(result);
    })

    app.get('/allArticles/:category', async (req, res) => {
      const category = req.params.category;
      const query = { category: category }
      const result = await articlesCollection.find(query).toArray()
      res.send(result)
    })
  
 
    app.get('/mostPopular', async (req, res) => {
      const query = {}
      const result = await mostPopularCollection.find(query).toArray()
      res.send(result)
    })

    app.get('/mostPopular/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await mostPopularCollection.findOne(query)
      res.send(result)
    })

    app.get('/allArticles/Technology', async (req, res) => {
      const query = {
          category: 'Technology'
      };
      const result = await articlesCollection.find(query).toArray();
      res.send(result);
  })
    app.get('/allArticles/AI', async (req, res) => {
      const query = {
          category: 'AI'
      };
      const result = await articlesCollection.find(query).toArray();
      res.send(result);
  })

  app.get('/article/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await articlesCollection.findOne(query)
    res.send(result)
  })

  }
  finally {

  }
}

run().catch(console.log)
app.get('/', (req, res) => {
  res.send("zahans insight running")
})
app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})