const router = require('express').Router()
const controller = require('../controllers/UserController')

router.post('/register', controller.Register)
router.get("/saved/:email", controller.getLikedMovies);
router.post("/add", controller.addToLikedMovies);
router.put("/remove", controller.removeFromLikedMovies);



module.exports = router   