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

const { createCandidate, getAllCandidates, editCandidateData, getCandidateById } = require("../controllers/candidate");

/**
 * Route serving candidate form.
 * @name POST /candidate/create
 * @function
 * @memberof module:routes/candidate~candidateRoutes
 * @inner
 * @returns {object} 201 - Created
 * @returns {Error} 400 - Unexpected Error
 */
router.post('/create', createCandidate);

/**
 * Route serving candidate form.
 * @name GET /candidate/all
 * @function
 * @memberof module:routes/candidate~candidateRoutes
 * @inner
 * @returns {object} 200 - OK
 * @returns {Error} 400 - Unexpected Error
 */
router.get('/all', getAllCandidates);

/**
  * Route serving edit candidate.
  * @name PUT /candidate/edit/:id
  * @function
  * @memberof module:routes/candidate~candidateRoutes
  * @inner
  * @returns {object} 200 - OK
  * @returns {Error} 400 - Unexpected Error
  */

router.put('/edit/:id', editCandidateData);

/**
  * Route serving get candidate by id.
  * @name GET /candidate/:id
  * @function
  * @memberof module:routes/candidate~candidateRoutes
  * @inner
  * @returns {object} 200 - OK
  * @returns {Error} 400 - Unexpected Error
  */

router.get('/:id', getCandidateById);
module.exports = router;
