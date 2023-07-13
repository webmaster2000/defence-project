// Client-side JavaScript code
const logoutBtn = document.querySelector("#btn");
const firstNameElement = document.getElementById("firstName");

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('firstName');
  window.location.href = 'index.html';
});

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

// Make the GET request to retrieve user data
fetch(`http://localhost:5000/user/${userId}`, {  // Added a closing parenthesis and a comma here
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  })
  .then(data => {
    // Handle the retrieved user data
    const { first_name } = data;
    firstNameElement.textContent = first_name;
  })
  .catch(error => {
    // Handle any errors that occur during the request or data handling
    console.error(error);
  });
  function toggleElements() {
    var profileLink = document.getElementById("profileLink");
    // var logoutBtn = document.getElementById("logoutBtn");

    profileLink.classList.toggle("hidden");
    logoutBtn.classList.toggle("hidden");
}




