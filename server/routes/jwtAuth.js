const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

router.post('/register', validInfo ,async(req,res)=>{
    try {

        //destruct request body
        const { name,email,password } = req.body;
        
        //check user exist

        const users = await pool.query("SELECT * FROM users WHERE email = $1",[email]);

        if(users.rows.length !== 0){
            return res.status(401).send("User already exist");
        }

        //decrypt users password 

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password,salt);

        //insert user into database

        const newUser = await pool.query("INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING *",[
            name,email,bcryptPassword
        ]);

        //generate jwt token

        const token = jwtGenerator(newUser.rows[0].id);

        res.json({token});


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

router.post('/login', validInfo ,async(req,res)=>{
    try {

        //destruct request body

        const { email,password } = req.body;

        //check user exist

        const users = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        
        if(users.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect"); 
        }

        //check valid password

        const validPassword = await bcrypt.compare(password,users.rows[0].password)

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect");
        }

        //generate jwt token

        const token = jwtGenerator(users.rows[0].id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

router.get('/is-verify', authorization ,async(req,res)=>{
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;