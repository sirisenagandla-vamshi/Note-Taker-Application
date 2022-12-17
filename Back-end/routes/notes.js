const express = require('express');
const { addNote, updateNote, deleteNote, getAnote } = require('../controllers/notes');
const { verifyToken } = require('../middlewares/authMiddelware');
const { getAllNotes } = require('../controllers/notes');
const { handleNoteParam } = require('../middlewares/noteMiddleware');
const router = express.Router()

router.param("noteId", handleNoteParam);

router.post("/add", verifyToken, addNote);
router.get("/getallNotes", verifyToken, getAllNotes);
router.put("/update/:noteId",verifyToken, updateNote);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.get("/getanote/:noteId", verifyToken,getAnote  );



module.exports = router;