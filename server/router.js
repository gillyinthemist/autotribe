const router = require('express').Router();
const userController = require('./controllers/user');
const vehicleController = require('./controllers/vehicle');
// const authMiddleware = require('./middlewares/auth');


router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', userController.profile);
router.post('/logout', userController.logout);

router.post('/vehicle', vehicleController.addVehicle);
router.get('/vehicles', vehicleController.getVehicles);



module.exports = router;
