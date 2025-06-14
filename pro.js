// // pro.js



// let users = JSON.parse(localStorage.getItem('users')) || {};
// let currentUserId = null;
// let hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPhotos')) || {};

// // Function to register a new user
// // function registerUser() {
// //     const newUserId = document.getElementById('newUserId').value;
// //     const newPassword = document.getElementById('newPassword').value;
// //     const mobileNumber = document.getElementById('mobileNumber').value;

// //     if (!newUserId || !newPassword || !mobileNumber) {
// //         alert('All fields are required!');
// //         return;
// //     }

// //     users[newUserId] = { password: newPassword, mobileNumber: mobileNumber };
// //     localStorage.setItem('users', JSON.stringify(users));
// //     alert('Registration successful!');

// //     document.getElementById('registration-form').style.display = 'none';
// //     document.getElementById('login-form').style.display = 'block';

// // }


// function registerUser() {
//     const user = document.getElementById('newUserId').value;
//     const pass = document.getElementById('newPassword').value;
//     const mobile = document.getElementById('mobileNumber').value;

//     fetch('/cgi-bin/register.pl', {
//         method: 'POST',
//         body: new URLSearchParams({ user, pass, mobile })
//     })
//     .then(res => res.json())
//     .then(data => {
//         alert(data.message);
//         if (data.status === 'success') {
//             document.getElementById('Registration-form').style.display = 'none';
//             document.getElementById('login-form').style.display = 'block';
//         }
//     });
// }

// // Function to validate the user login
// // function validateUser() {
// //     const userId = document.getElementById('userId').value;
// //     const password = document.getElementById('password').value;

// //     if (users[userId] && users[userId].password === password) {
// //         alert('Login successful!');
// //         currentUserId = userId;

// //         document.getElementById('login-form').style.display = 'none';
// //         document.getElementById('photo-selection').style.display = 'block';
// //     } else {
// //         alert('Invalid User ID or Password!');
// //     }
// // }

// function validateUser() {
//     const user = document.getElementById('userId').value;
//     const pass = document.getElementById('password').value;

//     fetch('/cgi-bin/login.pl', {
//         method: 'POST',
//         body: new URLSearchParams({ user, pass })
//     })
//     .then(res => res.json())
//     .then(data => {
//         alert(data.message);
//         if (data.status === 'success') {
//             currentUserId = user;
//             document.getElementById('login-form').style.display = 'none';
//             document.getElementById('photo-selection').style.display = 'block';
//         }
//     });
// }





// // Function to show the forgot password form
// function showForgotPasswordForm() {
//     document.getElementById('login-form').style.display = 'none';
//     document.getElementById('forgot-password-form').style.display = 'block';
// }

// // Function to send OTP to the user's mobile number
// function sendOTP() {
//     const forgotMobileNumber = document.getElementById('forgotMobileNumber').value;
//     const userId = Object.keys(users).find(id => users[id].mobileNumber === forgotMobileNumber);

//     if (!userId) {
//         alert('Mobile number not found!');
//         return;
//     }

//     const otp = Math.floor(1000 + Math.random() * 9000);
//     users[userId].otp = otp;
//     localStorage.setItem('users', JSON.stringify(users));
//     alert(`OTP sent to ${forgotMobileNumber}: ${otp}`);

//     currentUserId = userId;

//     document.getElementById('forgot-password-form').style.display = 'none';
//     document.getElementById('otp-form').style.display = 'block';
// }

// // Function to verify the OTP
// function verifyOTP() {
//     const otpInput = document.getElementById('otpInput').value;

//     if (users[currentUserId].otp == otpInput) {
//         alert('OTP verified successfully!');
//         document.getElementById('otp-form').style.display = 'none';
//         document.getElementById('reset-password-form').style.display = 'block';
//     } else {
//         alert('Invalid OTP!');
//     }
// }

// // Function to reset the password
// function resetPassword() {
//     const newPassword = document.getElementById('newPasswordReset').value;

//     if (!newPassword) {
//         alert('Password cannot be empty!');
//         return;
//     }

//     users[currentUserId].password = newPassword;
//     delete users[currentUserId].otp;
//     localStorage.setItem('users', JSON.stringify(users));
//     alert('Password reset successful!');

//     document.getElementById('reset-password-form').style.display = 'none';
//     document.getElementById('login-form').style.display = 'block';
// }

// /* Function to hide selected photos
// function hidePhotos() {
//     const files = document.getElementById('photoInput').files;
//     const photos = [];

//     for (let i = 0; i < files.length; i++) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             photos.push(e.target.result);
//             if (photos.length === files.length) {
//                 hiddenPhotos[currentUserId] = hiddenPhotos[currentUserId] || [];
//                 hiddenPhotos[currentUserId].push(...photos);
//                 localStorage.setItem('hiddenPhotos', JSON.stringify(hiddenPhotos));
//                 alert('Photos hidden successfully!');
//                 // Simulate removing photos from gallery
//                 document.getElementById('photoInput').value = ''; // Clear input
//             }
//         };
//         reader.readAsDataURL(files[i]);
//     }
// }*/

// // Function to show hidden photos
// // function showHiddenPhotos() {
// //     document.getElementById('photo-selection').style.display = 'none';
// //     document.getElementById('hidden-photos').style.display = 'block';
// //     displayHiddenPhotos();
// // }

// function showHiddenPhotos() {
//     document.getElementById('photo-selection').style.display = 'none';
//     document.getElementById('hidden-photos').style.display = 'block';

//     fetch('/cgi-bin/get_photos.pl')
//         .then(response => response.json())
//         .then(data => {
//             const photosContainer = document.getElementById('photosContainer');
//             photosContainer.innerHTML = '';
//             data.forEach(photo => {
//                 const img = document.createElement('img');
//                 img.src = photo;
//                 img.className = 'hidden-photo';
//                 photosContainer.appendChild(img);
//             });
//         });
// }


// // Function to display hidden photos
// function displayHiddenPhotos() {
//     const photosContainer = document.getElementById('photosContainer');
//     photosContainer.innerHTML = '';

//     if (hiddenPhotos[currentUserId] && hiddenPhotos[currentUserId].length > 0) {
//         hiddenPhotos[currentUserId].forEach(photo => {
//             const img = document.createElement('img');
//             img.src = photo;
//             img.className = 'hidden-photo';
//             photosContainer.appendChild(img);
//         });
//     } else {
//         photosContainer.innerHTML = '<p>No hidden photos available.</p>';
//     }
// }
// // Function to show login form and hide registration form
// function showLoginForm() {
//     document.getElementById("Registration-form").style.display = "none";
//     document.getElementById("login-form").style.display = "block";
// }
// function showRegisterForm() {
//     document.getElementById("login-form").style.display = "none";
//     document.getElementById("Registration-form").style.display = "block";
// }





let currentUserId = localStorage.getItem("loggedInUser") || null;

window.onload = function () {
    if (currentUserId) {
        document.getElementById('Registration-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('photo-selection').style.display = 'block';
        document.getElementById('welcomeUser').textContent = currentUserId;
    }
};


function registerUser() {
  const user = document.getElementById('newUserId').value;
  const pass = document.getElementById('newPassword').value;
  const mobile = document.getElementById('mobileNumber').value;

  if (!user || !pass || !mobile) {
    alert("All fields are required!");
    return;
  }

  fetch('/cgi-bin/register.pl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ user, pass, mobile })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if (data.status === 'success') {
      showLoginForm();
    }
  });
}

function validateUser() {
    const user = document.getElementById('userId').value;
    const pass = document.getElementById('password').value;

    fetch('/cgi-bin/login.pl', {
        method: 'POST',
        body: new URLSearchParams({ user, pass })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            currentUserId = user;
localStorage.setItem("loggedInUser", user);
document.getElementById('welcomeUser').textContent = currentUserId;


            // 👇 Set welcome message
            document.getElementById('welcomeUser').textContent = currentUserId;

            // 👇 Show the photo upload section
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('photo-selection').style.display = 'block';
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        alert("Failed to log in.");
    });
}


// function uploadPhotos() {
//     const input = document.getElementById('photoInput');
//     const files = input.files;

//     if (!files.length) {
//         alert("Please select at least one photo.");
//         return;
//     }

//     const formData = new FormData();
//     for (const file of files) {
//         formData.append('photo', file);
//     }

//     formData.append('user', currentUserId);  // use login user ID

//     fetch('/cgi-bin/upload_photo.pl', {
//         method: 'POST',
//         body: formData
//     })
//     .then(res => res.text())
//     .then(response => {
//         alert("Photo(s) uploaded successfully!");
//         input.value = ""; // reset file input
//     })
//     .catch(error => {
//         console.error("Upload failed:", error);
//         alert("Upload failed.");
//     });
// }


// function uploadPhotos() {
//     const input = document.getElementById('photoInput');
//     const files = input.files;

//     if (!files.length) {
//         alert("Please select at least one photo.");
//         return;
//     }

//     const formData = new FormData();
//     for (const file of files) {
//         formData.append('photo', file);
//     }

//     formData.append('user', currentUserId);  // Must match backend

//     fetch('/cgi-bin/upload_photo.pl', {
//         method: 'POST',
//         body: formData
//     })
//     .then(res => res.text())
//     .then(response => {
//         console.log("Upload response:", response);
//         alert("Photo(s) uploaded successfully!");
//         input.value = "";
//     })
//     .catch(error => {
//         console.error("Upload failed:", error);
//         alert("Upload failed.");
//     });
// }


function uploadPhotos() {
    const input = document.getElementById('photoInput');
    const files = input.files;

    if (!files.length) {
        alert("Please select at least one photo.");
        return;
    }

    const formData = new FormData();

    // Only append non-empty files
    for (const file of files) {
        if (file && file.size > 0) {
            formData.append('photo', file);
        }
    }

    formData.append('user', currentUserId); // must match Perl key

    fetch('/cgi-bin/upload_photo.pl', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(response => {
        alert(response.trim());
        input.value = ""; // reset
    })
    .catch(error => {
        console.error("Upload failed:", error);
        alert("Upload failed.");
    });
}
c




// function showHiddenPhotos() {
//     document.getElementById('photo-selection').style.display = 'none';
//     document.getElementById('hidden-photos').style.display = 'block';

//     fetch('/cgi-bin/get_photos.pl', {
//         method: 'POST',
//         body: new URLSearchParams({ user: currentUserId })
//     })
//     .then(res => res.json())
//     .then(data => {
//         const container = document.getElementById('photosContainer');
//         container.innerHTML = '';

//         if (data.length === 0) {
//             container.innerHTML = '<p>No hidden photos available.</p>';
//         } else {
//             data.forEach(photo => {
//                 const img = document.createElement('img');
//                 img.src = photo;
//                 img.className = 'hidden-photo';
//                 container.appendChild(img);
//             });
//         }
//     })
//     .catch(err => {
//         console.error("Error loading photos:", err);
//     });
// }
function showHiddenPhotos() {
    document.getElementById('photo-selection').style.display = 'none';
    document.getElementById('hidden-photos').style.display = 'block';

    fetch('/cgi-bin/get_photos.pl', {
        method: 'POST',
        body: new URLSearchParams({ user: currentUserId })
    })
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('photosContainer');
        container.innerHTML = '';

        if (data.length === 0) {
            container.innerHTML = '<p>No hidden photos available.</p>';
        } else {
        data.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo;
    img.className = 'hidden-photo';
    container.appendChild(img);
});




        }
    })
    .catch(err => {
        console.error("Error loading photos:", err);
    });
}






function showLoginForm() {
  document.getElementById("Registration-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function showRegisterForm() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("Registration-form").style.display = "block";
}
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    currentUserId = null;
    document.getElementById('photo-selection').style.display = 'none';
    document.getElementById('Registration-form').style.display = 'block';
}
function goBackToUpload() {
    document.getElementById('hidden-photos').style.display = 'none';
    document.getElementById('photo-selection').style.display = 'block';
}


let currentImageFilename = "";

function showModal(imageSrc, filename) {
  const modal = document.getElementById("photoModal");
  const modalImage = document.getElementById("modalImage");
  currentImageFilename = filename;

  modalImage.src = imageSrc;
  modal.style.display = "flex";
}

document.getElementById("closeModal").onclick = function () {
  document.getElementById("photoModal").style.display = "none";
  currentImageFilename = "";
};

document.getElementById("deletePhoto").onclick = function () {
  if (!currentImageFilename) return;

  fetch('/cgi-bin/delete_photo.pl', {
    method: 'POST',
    body: new URLSearchParams({
      user: currentUserId,
      filename: currentImageFilename
    })
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    document.getElementById("photoModal").style.display = "none";
    showHiddenPhotos(); // refresh view
  });
};

