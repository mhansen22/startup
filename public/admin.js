
const adminCodePlaceholder = document.getElementById("adminCodePlaceholder");

function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}


//adminCodePlaceholder.textContent = generateRandomCode(8);

//generate code
const adminCode = generateRandomCode(8);
adminCodePlaceholder.textContent = adminCode;
//store in local storage
localStorage.setItem("adminCode", adminCode);


fetch('/api/storeAdminCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ adminCode: adminCode }),
  })
  .then(response => response.json())
  .then(data => console.log('Admin code stored successfully:', data))
  .catch((error) => {
    console.error('Error storing admin code:', error);
  });



//from script in page

const username = localStorage.getItem("Username");
          const usernameDisplay = document.querySelector(".usernameDisplay");
          if (usernameDisplay) {
              usernameDisplay.textContent = username;
          }