const mongoose = require('mongoose')

const { Schema } = mongoose;

const blogSchema = new Schema({
    name:{
        type : String,
        require: true

    },
    email:{
        type : String,
        require: true,
        unique : true

    },
    password:{
        type : String,
        require: true

    },
    profile:{
        type : String,
        require: true

    },
    otp: {
         type : String
    },
    date:{
        type : Date,
        default : Date.now

    }
 
    
  });
  const createdb = mongoose.model('user' , blogSchema);
  createdb.createIndexes()
  
  module.exports = createdb;