const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const router = express.Router();
// Route 1: get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
});
// Route 2: Add a new note.Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error occured");
    }
  }
);

// Route 3: Update an existing Note 
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const {title,description,tag} = req.body;
  //Create a new note object
  try{const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  //Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  if(note.user.toString()!== req.user.id){
    return res.status(401).send("Not Allowed");
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
  res.json({note});}
  catch(error){
    console.error(error.message);
      res.status(500).send("Internal server Error occured");
  }


})

//Route 4:Deleting an existing Note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const {title,description,tag} = req.body;
  
    //Find the note to be updated and update it
    try {let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note:note});
}catch(error){
    console.error(error.message);
      res.status(500).send("Internal server Error occured");
}
})

module.exports = router;
