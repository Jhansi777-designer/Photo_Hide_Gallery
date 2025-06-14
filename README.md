# Photo_Hide_Gallery
**Photo Hide Gallery** is a secure web application that lets users register, log in, and hide their personal photos for privacy. Built with HTML, CSS, JavaScript, and a Perl backend, it ensures protected access and safe storage of images on shared or personal devices.
photo-hide-gallery/
├── pro.html                # Main frontend page (registration, login, upload)
├── pro.js                  # JavaScript for user actions and photo handling
├── pro.css                 # CSS for responsive and modal styling

├── uploads/                # Folder to store uploaded photos per user
│   └── user01/
│   └── user02/

├── cgi-bin/                # Perl CGI backend scripts
│   ├── register.pl         # Handles new user registration
│   ├── login.pl            # Validates login credentials
│   ├── upload_photo.pl     # Handles photo uploads
│   ├── get_photos.pl       # Sends photo data (base64 + filename)
│   └── delete_photo.pl     # Deletes individual photos

├── users.json              # Stores user credentials and mobile numbers
└── Dockerfile              # (Optional) For deploying with Docker on Render/AWS
