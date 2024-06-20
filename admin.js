document.addEventListener('DOMContentLoaded', function() {
    loadAttendanceHistory();
    clearOldRecords();
});

function loadAttendanceHistory() {
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const tableBody = document.getElementById('attendance-records');
    tableBody.innerHTML = '';

    attendanceRecords.forEach(record => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><button class="tbutton">${record.date}</button></td>
            <td><button class="tbutton">${record.name}</button></td>
            <td><button class="tbutton">${record.role}</button></td>
            <td><button class="tbutton">${record.checkInTime}</button></td>
            <td><button class="tbutton">${record.checkOutTime === 'N/A' ? 'Check-Out' : record.checkOutTime}</button></td>
            <td><button class="tbutton">${record.totalHours}</button></td>
        `;
        tableBody.appendChild(newRow);
    });
}

function clearOldRecords() {
    setInterval(() => {
        const now = new Date();
        let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
        attendanceRecords = attendanceRecords.filter(record => {
            const recordDate = new Date(record.date);
            const timeDiff = (now - recordDate) / (1000 * 60 * 60 * 24);
            return timeDiff < 30; // Keep records from the last 30 days
        });

        localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
        loadAttendanceHistory();
    }, 86400000); // Check every 24 hours
}
