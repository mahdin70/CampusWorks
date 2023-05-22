const mongoose = require('mongoose');
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect("mongodb+srv://hasnainkabir120:nbspl2@campusworks.ommmdwm.mongodb.net/?retryWrites=true&w=majority", connectionParams);
        console.log('Connected to database')
    }
    catch(error){
        console.log(error);
        console.log('Error connecting to database');
    }   
}

