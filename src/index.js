const express = require('express'); 

const app = express();

const port = 3333;

app.use(express.json());

require('./controllers/authController')(app);
require('./controllers/profileController')(app);

app.listen(port, () => {
    console.log(`Backend started on port ${port} 👻`);
});

