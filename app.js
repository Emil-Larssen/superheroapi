const express = require('express')
const app = express();


//app start
app.listen(3000, () => console.log('Server started on port 3000'));

//api endpoints
const router = require('./routes/heroRoutes');
app.use(express.json());
app.use(router);

// Invalid paths
router.use((req, res) => res.status(404).json({message: 'Not found'}));


//TODO heroRoutes.js slices
//TODO global errorHandler.js
//TODO JOI validation
//TODO Jest supertest testing



