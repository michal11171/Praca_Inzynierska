const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Polaczono z baza danych'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/group', require('./routes/api/group'));
app.use('/api/messages', require('./routes/api/messages'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Nasluchiwanie na ${PORT}`));
