// const express = require('express');
// const dotenv = require('dotenv');
// const DB = require('./config/dbConfig');
// const employeeRoute = require("./views/employee");
// const cors = require('cors');
// const hrRoute = require("./views/hr");

// dotenv.config();

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 8000;  // default port

// app.use(cors());

// app.get('/', (req, res) => {
//     res.send('API is Running');
// });

// app.use('/', employeeRoute);
// app.use('/hr', hrRoute);

// app.listen(PORT, () => {
//     console.log(`Server Running at http://localhost:${PORT}`);
// });



// new code 

// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const DB= require('./config/dbConfig');
const app = express();
app.use(bodyParser.json());
dotenv.config();

app.post('/employees', async (req, res) => {
  try {
    const { name } = req.body;
    const employee = await Employee.create({ name });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/shifts', async (req, res) => {
  try {
    const { employeeId, startTime } = req.body;
    const start_time = new Date(startTime);
    const end_time = new Date(start_time.getTime() + 9 * 60 * 60 * 1000); // 9 hours later
    const shift = await Shift.create({ employeeId, start_time, end_time });
    res.status(201).json(shift);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/employees/:id/shifts', async (req, res) => {
  try {
    const { id } = req.params;
    const shifts = await Shift.findAll({ where: { employeeId: id } });
    res.json(shifts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
});
