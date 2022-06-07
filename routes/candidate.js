/** Express router providing user related routes
 * @module routes/auth
 * @requires express
 */

/**
 * express module
 * @const
 * @namespace authRoutes
 */
const router = require("express").Router();

const { createCandidate } = require("../controllers/candidate");

/**
 * Route serving candidate form.
 * @name POST /candidate/create
 * @function
 * @memberof module:routes/auth~authRoutes
 * @inner
 * @returns {object} 201 - Created
 * @returns {Error} 400 - Unexpected Error
 */
router.post('/create', createCandidate);



module.exports = router;
