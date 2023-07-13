const form = document.querySelector(".form");
const fullname = document.querySelector("#fullname");
const myemail = document.querySelector("#email");
const phone = document.querySelector("#tel");
const mystreet = document.querySelector("#street");
const landmark = document.querySelector("#landmark");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const newtime = document.querySelector("#appt");
const quantity = document.querySelector("#quantity");
const checkboxes = document.querySelectorAll('input[name="delivery-option"]');
const subbtn = document.querySelector("#submit");

subbtn.addEventListener("click", function(event) {
  event.preventDefault();

  if (
    !fullname.value ||
    !myemail.value ||
    !phone.value ||
    !mystreet.value ||
    !landmark.value ||
    !city.value ||
    !date.value ||
    !newtime.value ||
    !quantity.value ||
    !getSelectedCheckboxValue(checkboxes)
  ) {
    alert("Please fill the form correctly.");
    return; // Stop further execution
  }

  if (!isValidEmail(myemail.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  const formData = {
    fullname: fullname.value,
    email: myemail.value,
    phone: phone.value,
    street: mystreet.value,
    landmark: landmark.value,
    city: city.value,
    date: date.value,
    appointment: newtime.value,
    quantity: quantity.value,
    deliveryOption: getSelectedCheckboxValue(checkboxes),
  };

  console.log(formData);
  form.reset();

  // Remove the form
  form.style.display = "none";

  // Display success popup
  displaySuccessPopup();

  // Send the confirmation email
  sendConfirmationEmail(myemail.value);
});

function getSelectedCheckboxValue(checkboxes) {
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      return checkbox.value;
    }
  }
  return null;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sendConfirmationEmail(email) {
  // Create a transporter using your SMTP server details
  const transporter = nodemailer.createTransport({
    host: "your-smtp-server.com",
    port: 587, // or the appropriate port for your SMTP server
    secure: false,
    auth: {
      user: "your-smtp-username",
      pass: "your-smtp-password",
    },
  });

  // Set up the email data
  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Confirmation code",
    text: "Thank you for submitting the form. Your submission has been successful.",
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error("Error sending confirmation email:", error);
      // Implement error handling logic here
    } else {
      console.log("Confirmation email sent successfully!");
      // Implement any additional logic here after successfully sending the confirmation email
    }
  });
}

function displaySuccessPopup() {
  const successPopup = document.createElement("div");
  successPopup.classList.add("success-popup");

  const successMessage = document.createElement("p");
  successMessage.textContent = "Successful! Our staff will contact you. Also, check your email for a confirmation code.";
  successMessage.classList.add("success-message");

  const closeButton = document.createElement("span");
closeButton.classList.add("close-button");
closeButton.innerHTML = "&times;";
closeButton.addEventListener("click", function() {
  window.location.href = "home.html";
});

  successPopup.appendChild(successMessage);
  successPopup.appendChild(closeButton);
  document.body.appendChild(successPopup);
}

