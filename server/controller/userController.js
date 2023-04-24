const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//The first function named "registerUser" handles the registration of a new user in the database. The function first extracts the required data from the request body using destructuring. Then, the function checks if a user with the same email already exists in the database using the "findOne" method of the "User" model. If so, the function responds with a status code of 400 and a JSON message. Otherwise, a new "User" object is created with the extracted data, and the "save" method is called to save the object to the database. If the save operation is successful, the function responds with a status code of 201 and a success message in JSON format. If an error occurs, the function responds with a status code of 500 and an error message in JSON format.

exports.registerUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  console.log({ name, lastName, email, password });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, lastName, email, password });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//The second function named "signInUser" handles the user sign-in process. The function first extracts the required data from the request body using destructuring. Then, the function checks if a user with the specified email exists in the database using the "findOne" method of the "User" model. If the user is not found, the function responds with a status code of 400 and a JSON message. Otherwise, the function uses the "bcrypt" library to compare the provided password with the hashed password of the retrieved user. If the passwords do not match, the function responds with a status code of 400 and a JSON message. Otherwise, the function creates a JSON web token (JWT) using the "jsonwebtoken" library and signs it with the user's email, password, and a secret key obtained from the environment variable "JWT_SECRET". The function then responds with a status code of 200 and the signed JWT in JSON format. If an error occurs, the function responds with a status code of 500 and an error message in JSON format.//

exports.signInUser = async (req, res) => {
  console.log("Request body:", req.body);

  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(user);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    return res.status(200).send({ message: "Signed In!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
