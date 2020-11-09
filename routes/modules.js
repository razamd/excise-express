const express = require( 'express' );
const {create , findById , getAll , update, paginationViews, deleteModule, updateWithQuery} = require('../controllers/ModuleController');
const { validateToken } = require('../middlewares/token');
const { idIsPresent, bodyIsPresent } = require('../middlewares/validators/Cords');
let router = express.Router();

router.post( '/create', bodyIsPresent ,validateToken,  ( req, res ) => {
    create(req , res);
} );

router.get('/view/:id' ,idIsPresent ,validateToken, ( req , res ) => {
    findById( req , res );
});

router.get('/getAll' ,validateToken, ( req , res ) => {
    getAll( req , res );
});

router.post('/update/:id' ,idIsPresent , bodyIsPresent ,validateToken, ( req , res ) => {
    update( req , res );
});

router.post('/views' , bodyIsPresent , validateToken , (req , res)=>{
    paginationViews(req , res);
});

router.get('/delete/:id' ,idIsPresent ,validateToken, ( req , res ) => {
    deleteModule( req , res );
});

router.post('/updatewq/:id' ,idIsPresent , bodyIsPresent ,validateToken, ( req , res ) => {
    updateWithQuery( req , res );
});

module.exports = router;