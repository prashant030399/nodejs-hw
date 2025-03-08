const express = require('express');
const app = express();
app.use(express.json());

const studentRoutes  = require('./routes/studentRoutes');
app.use('/student',studentRoutes);

const db = require('./db.js');

const PORT = process.env.PORT || 18000 ; 

app.listen(PORT, () => {
console.log(`Your server is running at ${PORT}`);
})



