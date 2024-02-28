const User = require('../models/user');
const Vehicle = require('../models/vehicle');

async function getVehicles(req, res) {
  try {
    // Find user and populate their recipes array:
    const user = await User.findOne({ _id: '65df76218a4e7c8bce59abdf' });
    userWithVehicles = await user.populate('vehicles');
    res.status(200).send(userWithVehicles.vehicles);
  } catch (error) {
    res.status(404).send({ error, message: 'Resource not found' });
  }
}

async function addVehicle(req, res) {
  const { vrm } = req.body;
  const vehicleExists = await Vehicle.findOne({vrm: vrm});
  if (vehicleExists)
    return res
      .status(409)
      .send({ error: '409', message: 'Vehicle already exists' });
  try {
    const vehicle = await Vehicle.create(req.body);
    // Update vehicles array in user collection
    const user = await User.findOne({ _id: '65df76218a4e7c8bce59abdf' });
    user.vehicles.push(vehicle._id);
    user.save();
    res.status(201).send(vehicle);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create vehicle' });
  }
}

// async function create (req, res) {
//   const { email, password, userName } = req.body;
//   const user = await User.findOne({$or: [
//     {email: email},
//     {userName: userName}
// ]});

//   if (user)
//     return res
//       .status(409)
//       .send({ error: '409', message: 'User already exists' });

//   try {
//     if (password === '') throw new Error();
//     const hash = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       ...req.body,
//       password: hash,
//     });
//     const user = await newUser.save();
//     // req.session.uid = user._id;
//     res.status(201).send(user);
//   } catch (error) {
//     res.status(400).send({ error, message: 'Could not create user' });
//   }
// };

// async function login (req, res)  {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email });
//     const validatedPass = await bcrypt.compare(password, user.password);
//     if (!validatedPass) throw new Error();
//     // req.session.uid = user._id;
//     res.status(200).send(user);
//   } catch (error) {
//     res
//       .status(401)
//       .send({ error: '401', message: 'Username or password is incorrect' });
//   }
// };

// async function profile (req, res)  {
//   try {
//     const { _id, firstName, lastName } = req.user;
//     const user = { _id, firstName, lastName };
//     res.status(200).send(user);
//   } catch {
//     res.status(404).send({ error, message: 'User not found' });
//   }
// };

// const logout = (req, res) => {
//   req.session.destroy((error) => {
//     if (error) {
//       res
//         .status(500)
//         .send({ error, message: 'Could not log out, please try again' });
//     } else {
//       res.clearCookie('sid');
//       res.status(200).send({ message: 'Logout successful' });
//     }
//   });
// };

module.exports = { getVehicles, addVehicle };
