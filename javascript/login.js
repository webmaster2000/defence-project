const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginbtn');
const seePassword = document.querySelector('.fa-light');
const passwords = document.querySelectorAll('#password');

loginButton.addEventListener('click', async function (event) {
  event.preventDefault(); // Prevent form submission

  const email = emailInput.value;
  const password = passwordInput.value;

  // Perform validation or login logic here
  // Example: Check if email and password are not empty
  if (email.trim() === '' || password.trim() === '') {
    alert('Please enter your email and password.');
    return;
  }

  // Regular expression pattern to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  const isValidEmail = emailPattern.test(email);

  if (!isValidEmail) {
    alert('The email is not valid.');
    return;
  }

  // Perform additional password validation if needed
  // Example: Minimum length, special characters, etc.
  if (password.length < 8) {
    alert('Put the correct password.');
    return;
  }

  // Prepare the user credentials object
  const userCredentials = {
    email: email,
    password: password,
  };

  try {
    // Check the user credentials against the database
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });

    // Reset the form after submission
    emailInput.value = '';
    passwordInput.value = '';

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();

    if (data) {
      console.log(data);
      const token = data.token;
      const id = data.id;
      const email = data.email
      const firstName = data.firstName;
      const lastName = data.lastName;
    
      // Store the token, user ID, email, and first name in browser local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('email', email);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      // Redirect to the home page
      window.location.href = "home.html";
    } else {
      throw new Error('Invalid email or password. Please try again.');
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
seePassword.addEventListener('click', () => {
  passwords.forEach(pass => {
    if(pass.type == 'password'){
      pass.type = 'text'
    }else{
      pass.type = 'password'
    }
  })
})