const express = require( 'express' );
const {create , findById , getAll , update, paginationViews, deleteDepartment, updateWithQuery} = require('../controllers/DepartmentController');
const { idIsPresent, bodyIsPresent } = require('../middlewares/validators/Cords');
let router = express.Router();

router.post( '/create', bodyIsPresent ,  ( req, res ) => {
    create(req , res);
} );

router.get('/view/:id' ,idIsPresent , ( req , res ) => {
    findById( req , res );
});

router.get('/getAll' , ( req , res ) => {
    getAll( req , res );
});

router.post('/update/:id' ,idIsPresent , bodyIsPresent , ( req , res ) => {
    update( req , res );
});

router.post('/views' , bodyIsPresent , (req , res)=>{
    paginationViews(req , res);
});

router.get('/delete/:id' ,idIsPresent , ( req , res ) => {
    deleteDepartment( req , res );
});

router.post('/updatewq/:id' ,idIsPresent , bodyIsPresent , ( req , res ) => {
    updateWithQuery( req , res );
});

module.exports = router;