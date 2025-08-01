const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
    const {username,email,password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: `email already registered`});
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            username,
            email,
            password:hashedPassword,
        });
        await user.save();

        res.status(201).json({message:`user registered succesfully`});
    } catch(err) {
        res.status(500).json({message:`server error`,error:err.message});
    }
};

exports.login = async (req,res) => {
    const {email, password} = req.body ;

    try {
        const user = await User.findOne ({email});

        if (!user)
            return res.status(400).json({message: 'invalid email or password'});

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch)
            return res.status(400).json({message: 'invalid email or password'});

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }

};