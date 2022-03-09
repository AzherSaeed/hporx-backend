const mongoose = require('mongoose');

const connectedDB = () => {
    try{
        const connection = mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        console.log(`mongodb connected`)
    }
    catch(error){
        console.log('mongodb error' , error )
    }
}

module.exports = connectedDB