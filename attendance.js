// function updateDateTime() {
//   const now = new Date();
//   document.getElementById("current-date").textContent =
//     now.toLocaleDateString();
//   document.getElementById("current-time").textContent =
//     now.toLocaleTimeString();
// }

function updateDateTime() {
  const now = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  document.getElementById("current-date").textContent = now.toLocaleDateString(
    "en-GB",
    options
  );
  document.getElementById("current-time").textContent =
    now.toLocaleTimeString();
}

document.addEventListener("DOMContentLoaded", function () {
  updateDateTime();
  setInterval(updateDateTime, 1000); // Update the time every second
  document.getElementById("admin-link").style.display = "block";
  document.getElementById("attendance-history-link").style.display = "block";
});

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulate login process
  if (username === "user" && password === "password") {
    document.querySelector(".login-page").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("user-name").textContent = "Fatima"; // Update with actual user info
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  document.getElementById("dashboard").style.display = "none";
  document.querySelector(".login-page").style.display = "block";
  // Re-enable the Check-In button when logging out
  document.querySelector(".checkin").disabled = false;
}

// function updateCurrentStaffInfo(userName, userRole, currentDate, currentTime) {
//     document.getElementById('user-name').textContent = userName;
//     document.getElementById('user-role').textContent = userRole;
//     document.getElementById('current-date').textContent = currentDate;
//     document.getElementById('current-time').textContent = currentTime;
// }

function checkIn() {
  const now = new Date();
  const userName = document.getElementById("user-name").textContent;
  const userRole = document.getElementById("user-role").textContent;
  const currentDate = now.toLocaleDateString();
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let attendanceRecords =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [];

  // Check if there's already a check-in for today
  const todayRecord = attendanceRecords.find(
    (record) => record.name === userName && record.date === currentDate
  );
  if (todayRecord) {
    alert("You've already checked in today!");
    return;
  }

  // Update last check-in time in the DOM
  document.getElementById("last-check-in").textContent = currentTime;

  // Store the current check-in time in localStorage
  localStorage.setItem("lastCheckIn", now);

  // Create a new attendance record
  const newRecord = {
    date: currentDate,
    name: userName,
    role: userRole,
    checkInTime: currentTime,
    checkOutTime: "N/A",
    totalHours: "0.00",
  };

  // Add the new record to the attendanceRecords array
  attendanceRecords.push(newRecord);
  localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));

  // Reload the attendance history
  loadAttendanceHistory();

  // Disable the Check-In button
  document.querySelector(".checkin").disabled = true;

  // Show success alert
  alert("Check-In successful at " + currentTime);
}

function checkOut(button) {
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  button.textContent = currentTime;

  const lastCheckIn = new Date(localStorage.getItem("lastCheckIn"));
  const totalHours = ((now - lastCheckIn) / (1000 * 60 * 60 * 60)).toFixed(2);
  button.parentElement.nextElementSibling.textContent = totalHours;

  // Update last check-out time
  document.getElementById("last-check-out").textContent = currentTime;
  document.getElementById("total-hours").textContent = totalHours + hrs;

  // Update the attendance record in localStorage
  let attendanceRecords =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  const index = attendanceRecords.findIndex(
    (record) => record.checkInTime === button.previousElementSibling.textContent
  );
  if (index !== -1) {
    attendanceRecords[index].checkOutTime = currentTime;
    attendanceRecords[index].totalHours = totalHours;
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(attendanceRecords)
    );
  }
}

function showAttendanceHistory() {
  const attendanceHistory =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  const tableBody = document
    .getElementById("attendance-table")
    .querySelector("tbody");
  tableBody.innerHTML = "";

  attendanceHistory.forEach((record) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = ` 
            <td><button class="tbutton">${record.date}</button></td>
            <td><button class="tbutton">${record.name}</button></td>
            <td><button class="tbutton">${record.role}</button></td>
            <td><button class="tbutton">${record.checkInTime}</button></td>
            <td><button class="out" onclick="checkOut(this)">Check-Out</button></td>
            <td><button class="tbutton">${record.totalHours}</button></td>
        `;
    tableBody.appendChild(newRow);
  });

  document.getElementById("search-form").style.display = "none";
  document.getElementById("staff-info").style.display = "none";
  document.getElementById("attendance-history").style.display = "block";
}

const staffData = [
  {
    staffId: "001",
    profilePic: "img/black girl.jpeg",
    name: "Fatima Ogbanje",
    role: "Intern",
  },
  {
    staffId: "002",
    profilePic: "img/rob.jpeg",
    name: "Benard Yusuf",
    role: "Manager",
  },
  {
    staffId: "003",
    profilePic: "img/tech1.jpeg",
    name: "Sylvester Agaba",
    role: "Developer",
  },
  {
    staffId: "004",
    profilePic: "img/tech2.jpeg",
    name: "Chimdindu u",
    role: "Developer",
  },
];

function searchStaff(event) {
  event.preventDefault();
  const staffId = document.getElementById("staff-id").value;
  const staff = staffData.find((s) => s.staffId === staffId);

  if (staff) {
    document.getElementById("profile-picture").src = staff.profilePic;
    document.getElementById("user-name").textContent = staff.name;
    document.getElementById("user-role").textContent = staff.role;
    document.getElementById("staff-info").style.display = "block";
    document.getElementById("search-form").style.display = "none";
    document.getElementById("admin-link").style.display = "none";
    document.getElementById("attendance-history-link").style.display = "none";
  } else {
    alert("Staff not found");
  }
}
