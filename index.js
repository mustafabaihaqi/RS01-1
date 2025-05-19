const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const queueRoutes = require('./routes/queueRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/queue', queueRoutes);
app.use('/api/doctor', doctorRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));