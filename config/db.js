const moongose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        
        await moongose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
        console.log('Polaczono z baza danych');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;