const express = require( 'express' );
const { signIn } = require('../controllers/AuthController');
const { bodyIsPresent } = require('../middlewares/validators/Cords');
let router = express.Router();

router.post( '/auth', bodyIsPresent,  ( req, res ) => {
    signIn(req , res);
} );

module.exports = router;