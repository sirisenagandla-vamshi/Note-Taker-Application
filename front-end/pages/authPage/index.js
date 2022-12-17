const body = document.querySelector("body");

const apiUrl = "http://localhost:8000";

window.addEventListener("load", () => {
  body.classList.add("visible");
});

const signInForm = document.querySelector(".signIn-form");

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const signInEmail = document.querySelector(".signIn-email");
  const signInPassword = document.querySelector(".signIn-password");

  const email = signInEmail.value;
  const password = signInPassword.value;
  console.log(email,password)
  fetch(`${apiUrl}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;
      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/pages/dashbord/index.html";
      } else {
        alert("SignIn Again");
      }
    })
    .catch((err) => {
      alert("Error in Signing In  RETRY!!!");
      console.log(err);
    });
});

const signUpForm = document.querySelector(".signUp-form");

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector(".signUp-email").value;
  const name = document.querySelector(".signUp-name").value;
  const password = document.querySelector(".signUp-password").value;
  const retypedPassword = document.querySelector(".signUp-retyped-password").value;

  console.log(email)
  if (password !== retypedPassword) {
    alert("password doesn't match");
    return;
  }

  fetch(`${apiUrl}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;

      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/pages/dashbord/index.html";
      } else {
        alert("SignUp Again");
      }
    })
    .catch((err) => {
      alert("Error in Signing Up  RETRY!!!");
      console.log(err);
    });
});
