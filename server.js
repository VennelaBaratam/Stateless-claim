const express = require('express');
const connectDB = require('./config/database');
const claimRoutes = require('./routes/claimRoutes');
const policyholderRoutes = require('./routes/policyholderRoutes');
const policyRoutes = require('./routes/policyRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use('/claims', claimRoutes);
app.use('/policyholders', policyholderRoutes);
app.use('/policies', policyRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
