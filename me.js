
function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    document.getElementById("current-date").textContent = now.toLocaleDateString('en-GB', options); // Formats date as DD/MM/YYYY
    document.getElementById("current-time").textContent = now.toLocaleTimeString(); // Formats time as HH:MM:SS
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
  
  function checkIn() {
    const now = new Date();
    const userName = document.getElementById("user-name").textContent;
    const userRole = document.getElementById("user-role").textContent;
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const currentDate = now.toLocaleDateString('en-GB', options);
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
    showAttendanceHistory();
  
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
  
    const lastCheckIn = new Date(localStorage.getItem("lastCheckIn"));
    const totalHours = ((now - lastCheckIn) / (1000 * 60 * 60)).toFixed(2);
  
    // Update the button text to the current checkout time
    button.textContent = currentTime;
  
    // Update the total hours
    button.parentElement.nextElementSibling.textContent = totalHours;
  
    // Update last check-out time in the DOM
    document.getElementById("last-check-out").textContent = currentTime;
    document.getElementById("total-hours").textContent = ${totalHours} hrs;
  
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
      newRow.innerHTML = 
              <td><button class="tbutton">${record.date}</button></td>
              <td><button class="tbutton">${record.name}</button></td>
              <td><button class="tbutton">${record.role}</button></td>
              <td><button class="tbutton">${record.checkInTime}</button></td>
              <td><button class="out" onclick="checkOut(this)">Check-Out</button></td>
              <td><button class="tbutton">${record.totalHours}</button></td>
          ;
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
    {
      staffId: "005",
      profilePic: "img/tech4.jpeg",
      name: "joy",
      role: "nails",
    },
    {
      staffId: "006",
      profilePic: "img/chip.jpeg",
      name: "rita",
      role: "nails",
    },
    {
      staffId: "007",
      profilePic: "img/tech3.jpeg",
      name: "pearl",
      role: "warrror",
    },
    {
      staffId: "008",
      profilePic: "img/tech.gif",
      name: "emag",
      role: "fighter",
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
  
   document.addEventListener("DOMContentLoaded", function () {
          loadAttendanceHistory();
          clearOldRecords();
        });
  
        function checkIn() {
          const now = new Date();
          const date = now.toLocaleDateString();
          const checkInTime = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          const name = "Fatima"; // Get the staff name dynamically as needed
          const role = "Intern"; // Get the staff role dynamically as needed
  
          let attendanceRecords =
            JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  
          // Check if there's already a check-in for today
          const todayRecord = attendanceRecords.find(
            (record) => record.name === name && record.date === date
          );
          if (todayRecord) {
            alert("You've already checked in today!");
            return;
          }
  
          const newRecord = {
            date: date,
            name: name,
            role: role,
            checkInTime: checkInTime,
            checkOutTime: "N/A",
            totalHours: "0.00",
          };
  
          attendanceRecords.push(newRecord);
          localStorage.setItem(
            "attendanceRecords",
            JSON.stringify(attendanceRecords)
          );
  
          // Reload attendance history
          loadAttendanceHistory();
        }
  
        function handleCheckOut(button) {
          const now = new Date();
          const currentTime = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          const userName = button
            .closest("tr")
            .querySelector("td:nth-child(2)")
            .textContent.trim();
          const currentDate = now.toLocaleDateString();
  
          let attendanceRecords =
            JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  
          // Find today's record for the user
          const todayRecord = attendanceRecords.find(
            (record) => record.name === userName && record.date === currentDate
          );
          console.log(currentDate)
          if (!todayRecord || todayRecord.checkOutTime !== "N/A") {
            alert("You haven't checked in today or you've already checked out!");
            return;
          }
  
          // Calculate total hours and minutes worked
          const checkInTime = new Date(
            ${now.toDateString()} ${todayRecord.checkInTime}
          );
          const timeDifference = now - checkInTime;
          const hoursWorked = Math.floor(timeDifference / (1000 * 60 * 60 * 60));
          const minutesWorked = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60)
          );
          const totalHours = ${hoursWorked}:${
            minutesWorked < 10 ? "0" + minutesWorked : minutesWorked
          };
  
          // Update the record with check-out time and total hours
          todayRecord.checkOutTime = currentTime;
          todayRecord.totalHours = totalHours;
          localStorage.setItem(
            "attendanceRecords",
            JSON.stringify(attendanceRecords)
          );
  
          // Update the button and total hours in the table
          button.textContent = currentTime;
          button.parentElement.nextElementSibling.textContent = totalHours;
  
          // Reload the attendance history
          loadAttendanceHistory();
  
          // Show success alert
          alert("Check-Out successful at " + currentTime);
        }
  
        function loadAttendanceHistory() {
          const attendanceHistory =
            JSON.parse(localStorage.getItem("attendanceRecords")) || [];
          const tableBody = document
            .getElementById("attendance-table")
            .querySelector("tbody");
          tableBody.innerHTML = "";
  
          attendanceHistory.forEach((record) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = 
                      <td><button class="tbutton">${record.date}</button></td>
                      <td><button class="tbutton">${record.name}</button></td>
                      <td><button class="tbutton">${record.role}</button></td>
                      <td><button class="tbutton">${
                        record.checkInTime
                      }</button></td>
                      <td><button class="out">${
                        record.checkOutTime === "N/A"
                          ? "Check-Out"
                          : record.checkOutTime
                      }</button></td>
                      <td><button class="tbutton">${
                        record.totalHours
                      }</button></td>
                  ;
            tableBody.appendChild(newRow);
  
            // Attach event listener for the check-out button in this row
            const checkOutButton = newRow.querySelector(".out");
            checkOutButton.addEventListener("click", function () {
              handleCheckOut(checkOutButton);
            });
          });
        }
  
        // function clearOldRecords() {
        //   setInterval(() => {
        //     const now = new Date();
        //     let attendanceRecords =
        //       JSON.parse(localStorage.getItem("attendanceRecords")) || [];
        //     attendanceRecords = attendanceRecords.filter((record) => {
        //       const recordDate = new Date(record.date);
        //       const timeDiff = (now - recordDate) / (1000 * 60 * 60 * 24);
        //       return timeDiff < 1;
        //     });
  
        //     localStorage.setItem(
        //       "attendanceRecords",
        //       JSON.stringify(attendanceRecords)
        //     );
        //     loadAttendanceHistory();
        //   }, 3600000); // Check every hour
        // }
  
        function clearOldRecords() {
          function scheduleNextClear() {
            const now = new Date();
            let next12am = new Date();
            next12am.setHours(0, 0, 0, 0); // Set time to 5 PM today
  
            // If it's already past 5 PM today, schedule for 5 PM tomorrow
            if (now >= next12am) {
              next12am.setDate(next12am.getDate() + 1);
            }
  
            const timeUntilNext12am = next12am - now;
  
            setTimeout(() => {
              clearAttendanceRecords();
              scheduleNextClear(); // Schedule the next clearing
            }, timeUntilNext12am);
          }
  
          function clearAttendanceRecords() {
            const now = new Date();
            let attendanceRecords =
              JSON.parse(localStorage.getItem("attendanceRecords")) || [];
            attendanceRecords = attendanceRecords.filter((record) => {
              const recordDate = new Date(record.date);
              const timeDiff = (now - recordDate) / (1000 * 60 * 60 * 24);
              return timeDiff < 1;
            });
  
            localStorage.setItem(
              "attendanceRecords",
              JSON.stringify(attendanceRecords)
            );
            loadAttendanceHistory();
          }
  
          scheduleNextClear(); // Initial scheduling
        }
  
        function filterDailyRecords() {
          const now = new Date();
          const currentDate = now.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  
          let attendanceRecords =
            JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  
          // Filter records for the current date
          const dailyRecords = attendanceRecords.filter((record) => {
            return record.date === currentDate;
          });
  
          // Save filtered records to local storage
          localStorage.setItem(
            "dailyAttendanceRecords",
            JSON.stringify(dailyRecords)
          );
        }
  
        // Call the function to filter and save daily records
        filterDailyRecords();
      </script>
  
      <script src="attendance.js"></script>
    </body>
  </html>
  merge this 2 code together to be in one javascript file 