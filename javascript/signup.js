const form = document.querySelector(".form");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password-input");
const confpassword = document.querySelector("#confirmpassword");
const subbtn = document.querySelector("#submit-button");
const seePassword = document.querySelector('.fa-light')
const passwords = document.querySelectorAll('.password')

// add event listener to the button
subbtn.addEventListener("click", function(event) {
  event.preventDefault();

  if (
    !firstname.value ||
    !lastname.value ||
    !email.value ||
    !password.value ||
    !confpassword.value
  ) {
    alert("Please fill the form correctly.");
    return; // Stop further execution
  }

  if (password.value !== confpassword.value) {
    alert("Your passwords don't match.");
    return; // Stop further execution
  }

  if (password.value.length < 8) {
    alert("The password should be exactly 8 characters long.");
    return;
  }

  if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  const userLog = {
    first_name: firstname.value,
    last_name: lastname.value,
    email: email.value,
    password: password.value,
  };

  // Check if the email exists in the database
  fetch("http://localhost:5000/check-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exists) {
        alert("This email is already registered. Please use a different email address.");
      } else {
        // Proceed with creating the account
        fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLog),
        })
          .then((response) => {
            if (response.ok) {
              alert(" Successful!! Your account has been created."); 
              window.location.href = "login.html";
            } else {
              alert("Failed to create the account. Please try again.");
            }
            return response.json();
          })
          .then((data) => {
            form.reset();
            console.log(userLog);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  form.reset();
});

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

seePassword.addEventListener('click', () => {
  passwords.forEach(pass => {
    if(pass.type == 'password'){
      pass.type = 'text'
    }else{
      pass.type = 'password'
    }
  })
})