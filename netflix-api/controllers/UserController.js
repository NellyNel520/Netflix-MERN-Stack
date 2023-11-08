const { User } = require('../models')


// REGISTER NEW USER 
const Register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) { 
    res.status(500).json(err);
  }
 
}

// get all users
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json({ users });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}; 

// get users list by user id

const getUserByUserId = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (user) {
			return res.status(200).json({ user });
		}
		return res
			.status(404)
			.send('User with the specified ID does not exists');
	} catch (error) {
		return res.status(500).send(error.message);
	}
}; 


const getSavedList = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) { 
   
      return res.status(200).json({ savedList: user.likedMovies  });
    } 
    else return res.json({ msg: "User with given Id not found." });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// ADD TO USER LIST  
const addToLikedMovies =  async (req, res) => {
  try {
    const { email, data } = req.body;
    const user =  await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

// REMOVE TO USER LIST 
const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id, 
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};




module.exports = {
	Register,
	getSavedList, 
	addToLikedMovies,
	removeFromLikedMovies,
  getAllUsers,
  getUserByUserId
} 