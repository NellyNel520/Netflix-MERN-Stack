const { User } = require('../models/User')


// REGISTER NEW USER 
const Register = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }

}
// GET LIKED MOVIE
// ADD TO USER LIST 
// REMOVE TO USER LIST 




module.exports = {
	Register,
	// deleteUser,
	// getUserById,
	// getAllUsers,
	// getUserStats,
} 