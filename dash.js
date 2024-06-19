
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update the time every second
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login process
    if (username === 'user' && password === 'password') {
        document.querySelector('.login-page').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('current-staff-name').textContent = 'fatima'; // Update with actual user info
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelector('.login-page').style.display = 'block';
}

function updateCurrentStaffInfo(userName, userRole, currentDate, currentTime) {
    document.getElementById('user-name').textContent = userName;
    document.getElementById('user-role').textContent = userRole;
    document.getElementById('current-date').textContent = currentDate;
    document.getElementById('current-time').textContent = currentTime;
    console.log('current-staff-role') 
}


function checkIn() {
    const now = new Date();
    const userName = document.getElementById('user-name').textContent;
    const userRole = document.getElementById('user-role').textContent;
    const currentDate = now.toLocaleDateString();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    console.log(`Checking in for ${userName} (${userRole}) at ${currentTime} on ${currentDate}`);

    // Update last check-in time
    document.getElementById('last-check-in').textContent = currentTime;

    // Append details to the attendance history table
    const attendanceRecords = document.getElementById('attendance-records').querySelector('tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${currentDate}</td>
        <td>${userName}</td>
        <td>${userRole}</td>
        <td>${currentTime}</td>
        <td><button class="out" onclick="checkOut(this)">Check Out</button></td>
        <td>0.0</td>
    `;

    attendanceRecords.appendChild(newRow);
    console.log(newRow)

    localStorage.setItem('lastCheckIn', now);
}

function checkOut(button) {
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    button.textContent = currentTime;

    const lastCheckIn = new Date(localStorage.getItem('lastCheckIn'));
    const totalHours = ((now - lastCheckIn) / (1000 * 60 * 60)).toFixed(2);
    button.parentElement.nextElementSibling.textContent = totalHours;

    // Update last check-out time
    document.getElementById('last-check-out').textContent = currentTime;
    document.getElementById('total-hours').textContent = `${totalHours} hrs`;
}

function updateDateTime() {
    const now = new Date();
    document.getElementById('current-date').textContent = now.toLocaleDateString();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
}

const staffData = [
    {
        "staffId": "001",
        "profilePic": "img/black girl.jpeg",
        "name": "Fatima",
        "role": "Intern"
    },
    {
        "staffId": "002",
        "profilePic": "img/rob.jpeg",
        "name": "mr ben",
        "role": "Manager"
    },
    {
        "staffId": "003",
        "profilePic": "img/tech1.jpeg",
        "name": "mr sly",
        "role": "Developer"
    },
    {
        "staffId": "004",
        "profilePic": "img/tech2.jpeg",
        "name": "mr chimdi",
        "role": "Developer"
    }
];

function searchStaff(event) {
    event.preventDefault();
    const staffId = document.getElementById('staff-id').value;
    const staff = staffData.find(s => s.staffId === staffId);

    if (staff) {
        document.getElementById('profile-picture').src = staff.profilePic;
        document.getElementById('user-name').textContent = staff.name;
        document.getElementById('user-role').textContent = staff.role;
        document.getElementById('staff-info').style.display = 'block';
        document.getElementById('search-form').style.display = 'none';
    } else {
        alert('Staff not found');
    }
}