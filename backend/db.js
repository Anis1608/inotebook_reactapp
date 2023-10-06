const mongoose = require('mongoose')
const mongoURI  = "mongodb://localhost:27017/inotebook" 


const connectmongo = () =>{
    mongoose.connect(mongoURI , {  
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,})
}
console.log("Connected")

module.exports = connectmongo;