const express = require('express');

const authRoute = require('./auth');
const candidateRoute = require('./candidate');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/candidate', candidateRoute)

module.exports = router;