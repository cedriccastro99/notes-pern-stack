const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/",authorization,async(req,res)=>{
    try {
        
        // res.json(req.user);
        const user = await pool.query("SELECT name,email FROM users WHERE id = $1",[req.user.id]);

        res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


module.exports = router;