const mongoose = require('mongoose')
const mongoURI =
  "mongodb+srv://aniskhan45:Aniskhan7860@cluster0.6qticpm.mongodb.net/?retryWrites=true&w=majority"; 


const connectmongo = () =>{
    mongoose.connect(mongoURI , {  
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,})
}
console.log("Connected")

module.exports = connectmongo;