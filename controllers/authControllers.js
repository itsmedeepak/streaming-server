import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Use .js extension for ES modules


export const SignUp = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name } = req.body;


    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new User({
      email,
      password: hashedPassword,
      name,
    });

    // Save the user to the database
    await user.save();
    
    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// SignIn Controller
export const SignIn = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        user:user
      }
    };
    console.log(process.env.JWT_SECRET)

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const usr = {
        id:user._id,
        name:user.name,
        email:user.email,
        token:token
    }

    res.status(200).json({ user:usr });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' });
  }
};


export const ValidateToken = async(req, res)=>{
    console.log("auth")
    res.status(200).json({ success:true });
}