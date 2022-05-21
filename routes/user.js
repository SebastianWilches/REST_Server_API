const { Router } = require("express");
const { userGET, userPUT, userPOST, userDELETE } = require("../controllers/userController");

const router = Router();

//PETICIONES
//GET
router.get('/', userGET);

//PUT
router.put('/:id', userPUT); //Esto es para mandarlo por parametro 

//POST
router.post('/', userPOST);

//DELETE
router.delete('/', userDELETE);


module.exports = router;