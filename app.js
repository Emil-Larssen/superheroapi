const express = require('express')
const app = express();



//app start
if (require.main === module) {
    app.listen(3000, () => console.log('Server started on port 3000'));
}

//api endpoints
const router = require('./routes/heroRoutes');
app.use(express.json());
app.use(router);

// Invalid paths
router.use((req, res) => res.status(404).json({message: 'Not found'}));


const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;

//COMPLETED heroRoutes.js slices
//COMPLETED global errorHandler.js
//COMPLETED JOI validation
//COMPLETED Jest supertest testing



