const router = require('express').Router()
const controller = require('../controllers/UserController')

router.post('/register', controller.Register)
// router.get("/liked/:email", controller.getLikedMovies);
router.get("/all-users", controller.getAllUsers);
router.get("/:id", controller.getUserByUserId);
router.get("/savedList/:id", controller.getSavedList);
router.post("/add", controller.addToLikedMovies);
router.put("/remove", controller.removeFromLikedMovies);



module.exports = router      