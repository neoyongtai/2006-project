const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()


//create express sever
const app = express();
const port = process.env.PORT || 5000;

//connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
    );


const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection estabilished sucessfully")
})


//express middleware
app.use(cors());
app.use(express.json())

//Implement the routes
const reportRouter = require('./routes/report')
const usersRouter = require('./routes/users')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')

app.use('/report', reportRouter);
app.use('/users',usersRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);


//start the server
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
