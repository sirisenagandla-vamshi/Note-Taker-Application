exports.handleNoteParam = (req, res, next, id) => {

    req.noteId = id;
    next();
};