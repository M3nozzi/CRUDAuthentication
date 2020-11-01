const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {

    return response.json({ message: 'Logado!!!!' });
});

module.exports = app => app.use('/profiles', router);