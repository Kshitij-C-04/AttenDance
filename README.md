# AttendDance 📚✅

A modern **student attendance and fees management web app** built for mobile-first usage.

Live student attendance marking, fee tracking, calendar-based attendance history, and student-wise reports — all in one clean interface.

## Live Demo

🌐 App: https://attendance-bpqi.onrender.com

## Features

### Attendance Management

* Add new students
* Edit student names
* Delete students (with confirmation popup)
* Mark students **Present / Absent**
* Clear selected attendance before saving
* Save daily attendance
* Auto count:

  * Total Present
  * Total Absent
* Automatically clears selections after attendance is saved

### Student Attendance History

* View individual student attendance record
* Student-wise:

  * Present count
  * Absent count
  * Attendance percentage
* Calendar-style history popup

### Calendar View

* Visual monthly attendance calendar
* Shows attendance ratio (`Present/Total`)
* Click a date to view:

  * Present students
  * Absent students
* Delete attendance record for a selected date

### Fees Management

* Month-wise fee tracking
* Mark paid/unpaid for each month
* Per student fee record stored permanently

### Mobile First UI

* Clean responsive design
* Fast interactions
* Smooth modern cards
* Optimized for phones

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Deployment

* Render

---

## Project Structure

```bash
attendance-app/
│
├── src/
│   ├── components/
│   │   ├── CalendarView.jsx
│   │   ├── DeleteModal.jsx
│   │   ├── FeesView.jsx
│   │   └── StudentModal.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── api.js
│   └── main.jsx
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
└── package.json
```

---

## Installation

### Clone repo

```bash
git clone https://github.com/Kshitij-C-04/AttenDance.git
cd AttenDance/attendance-app
```

### Install frontend

```bash
npm install
```

### Install backend

```bash
cd server
npm install
cd ..
```

### Environment Variables

Create:

```bash
server/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## Run Locally

### Start backend

```bash
cd server
node index.js
```

### Start frontend

```bash
npm run dev
```

---

## Future Improvements

* Export attendance report
* Student profile photo
* Monthly analytics dashboard
* Dark mode
* Search filters
* Bulk student upload
* Multi-class support

---

## Author

**Kshitij Chaware**

## Repository

💻 GitHub Repo: https://github.com/Kshitij-C-04/AttenDance

👤 GitHub Profile: https://github.com/Kshitij-C-04
