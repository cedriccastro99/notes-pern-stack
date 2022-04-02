const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


router.get("/get-notes",authorization,async(req,res)=>{
    try {
        
        // const user = await pool.query("SELECT name,email FROM users WHERE id = $1",[req.user.id]);
        const notes = await pool.query("SELECT * FROM notes WHERE user_id = $1 ORDER BY id ASC",[req.user.id]);

        if(notes.rows.length === 0){
            res.json([]);
        }else{
            res.json(notes.rows);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

router.post("/create-note",authorization,async(req,res)=>{
    try {
        const {title,description,date_created} = req.body;
        const {id} = req.user;
        const newNote = await pool.query("INSERT INTO notes (user_id,note_title,note_description,date_created) values ($1,$2,$3,$4) RETURNING id",[
            id,title,description,date_created
        ])  

        if(newNote.rows.length !== 0){
            res.status(200).send('Create success');
        }else{
            console.error(error.message);
            res.status(500).send('Server error');
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

router.post("/edit-note",authorization,async(req,res)=>{
    try {
        const {title,description,date_updated,note_id} = req.body;
        const {id} = req.user;
        const newNote = await pool.query("UPDATE notes SET note_title = $1, note_description= $2 , date_updated = $3 WHERE id = $4 AND user_id = $5 RETURNING id",[
            title,description,date_updated,note_id,id
        ])  

        if(newNote.rows.length !== 0){
            res.status(200).send('Create success');
        }else{
            console.error(error.message);
            res.status(500).send('Server error');
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

router.post("/delete-note",authorization,async(req,res)=>{
    try {

        const {id} = req.body;
        await pool.query("DELETE FROM notes WHERE id = $1",[id]); 
        
        res.status(200).send('Success');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


module.exports = router;