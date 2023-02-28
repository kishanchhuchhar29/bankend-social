const router = require("express").Router();
const User = require("../models/User");
const bcryp = require("bcrypt");
//register
router.post("/register", async (req, res) => {

    try {
        //genrete new password
        const salt = await bcryp.genSalt(10);
        const hashedPassword = await bcryp.hash(req.body.password, salt);
        //create new user
        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            }
        );
        //save user and  respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LogIn
router.post("/login", async (req, res) => {
    console.log("kishan")
    try {
        console.log("lol")
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
    
        const validPassword = await bcryp.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
    
        res.status(200).json(user)
      } catch (err) {
        console.log("heyy");
        res.status(500).json(err)
      }

    
})

module.exports = router;