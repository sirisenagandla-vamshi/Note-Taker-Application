const cardContainer = document.querySelector(".card-container");
const logout = document.querySelector(".logout");
const createNotesButton = document.querySelector(".new-note");

const token = localStorage.getItem("jwt");
const apiUrl = "http://localhost:8000";


logout.addEventListener("click", () =>{
  localStorage.removeItem("jwt");
  location.href ="/"
});

let cardData = [];

createNotesButton.addEventListener("click",() =>{
  location.href = "/pages/createnotes/index.html";
})

const createNotes = (array) => {

  cardContainer.innerHTML = "";
  array.forEach(cardObj => {
      const { heading, content } = cardObj;
      const id =cardObj.noteId;

      const card = document.createElement("div");
      card.classList.add("card");
      card.id = id;

      const insideHtml = `
      <div class="card-heading">
        ${heading}
        <div class="edit-note">
          <a href="../updatenotes/index.html?noteId=${card.id}">
            <img class="edit-icon" src="../../assets/edit-note.svg" alt="edit options" />
          </a>
        </div>
      </div>
      <div class="card-content">
        ${content}
      </div>`;


      card.innerHTML = insideHtml;
      cardContainer.appendChild(card);
  });

};

const body = document.querySelector("body")
// console.log(body)
window.addEventListener("load", (event) =>{
  event.preventDefault()
  body.classList.add("visible");

 if(token){
  console.log("indisde")

  fetch(`${apiUrl}/note/getallNotes`, {
    method: "GET",
    headers: {
      authorization : token,
    },
 
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;
      console.log(data.data)
      cardData = data.data;
      createNotes(data.data)

    
    })
    .catch((err) => {
      alert("Error in Signing Up  RETRY!!!");
      console.log(err);
    });
  }
});