const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRoutes = require("./routes/movie.routes");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/movie', movieRoutes);

//connecing to MongoDB 

mongoose.connect('mongodb+srv://hariomsingh25700:WGZq3ZS0MRgsRIpg@imdb.ubsweki.mongodb.net/?retryWrites=true&w=majority&appName=imdb',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'imdb_clone' // Specify your database name here
  }
).then(()=>{
    console.log('Connnected to MongoDB')
}).catch((err)=>
{
    console.error('Getting Error connnecting to MongoDB',err)
});

// app.listen(PORT, ()=>
// {
//     console.log(`Server is running on Port  ${PORT}`)
// });

module.exports = app;


