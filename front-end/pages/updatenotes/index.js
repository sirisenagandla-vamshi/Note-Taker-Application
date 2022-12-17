const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");
console.log(noteId);

const updateNoteButton =document.querySelector(".create-note-button");
const deleteNoteButton =document.querySelector(".delete-note-button");

const apiUrl = "http://localhost:8000";

const token =localStorage.getItem("jwt");


const getNote = (array) => {

    array.forEach(cardObj => {
        const { heading, content } = cardObj;
        const id =cardObj.noteId;

        document.getElementById("input-heading").value = `${heading}`;
        document.getElementById("input-content").value = `${content}`;
        
    });
    
}

window.addEventListener("load", () => {

    if (token) {

        fetch(`${apiUrl}/note/getanote/${noteId}`, {
            method: 'GET',
            headers: {
                authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                getNote(data.data);
            })
            .catch((err) => {
                alert("Error in getting note! ");
                console.log(err);
            });
    }


});



updateNoteButton.addEventListener("click", () => {

   

    const content = document.querySelector(".create-note-input").value;
    const heading = document.querySelector(".create-note-heading").value;

    if (token) {

        fetch(`${apiUrl}/note/update/${noteId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({ content, heading }),
        })
            .then((res) => res.json())
            .then((data) => {
                
                    location.href = "/pages/dashbord/index.html";
            })
            .catch((err) => {
                alert("Error in Updating notes! Re-Try");
                console.log(err);
            });

    }

});



deleteNoteButton.addEventListener("click", () => {

    if (token) {

        fetch(`${apiUrl}/note/delete/${noteId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                
                    location.href = "/pages/dashbord/index.html";
            })
            .catch((err) => {
                alert("Error in deleted notes! Re-Try");
                console.log(err);
            });

    }


});

