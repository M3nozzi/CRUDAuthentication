const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (request, response) => {

    return response.json({ message: 'Logado!!!!', user: request.userId });
});

module.exports = app => app.use('/profiles', router);