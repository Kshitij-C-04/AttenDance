import { useEffect, useState } from "react";
import API from "../api";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
} from "react-icons/fa";

import StudentModal from "../components/StudentModal";
import DeleteModal from "../components/DeleteModal";
import CalendarView from "../components/CalendarView";
import FeesView from "../components/FeesView";

function Home() {
    const [tab, setTab] = useState("attendance");
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [name, setName] = useState("");
    const [editing, setEditing] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [search, setSearch] = useState("");

    const [selectedStudent, setSelectedStudent] =
        useState(null);

    const [stats, setStats] = useState({
        present: 0,
        absent: 0,
        percentage: 0,
        history: [],
    });

    const [openModal, setOpenModal] =
        useState(false);

    const [deleteModal, setDeleteModal] =
        useState(false);

    const [studentToDelete, setStudentToDelete] =
        useState(null);

    const today = new Date().toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    useEffect(() => {
        fetchStudents();
        fetchAttendance();
    }, []);

    async function fetchStudents() {
        const res = await API.get("/students");
        setStudents(res.data);
    }

    async function fetchAttendance() {
        const res = await API.get("/attendance");
        setAttendanceData(res.data);
    }

    async function addStudent() {
        if (!name.trim()) return;

        await API.post("/students", {
            name: name.trim(),
        });

        setName("");
        fetchStudents();
    }

    async function updateStudent() {
        await API.put(`/students/${editing}`, {
            name,
        });

        setEditing(null);
        setName("");
        fetchStudents();
    }

    function askDelete(student) {
        setStudentToDelete(student);
        setDeleteModal(true);
    }

    async function confirmDelete() {
        await API.delete(
            `/students/${studentToDelete._id}`
        );

        setAttendance((prev) => {
            const updated = { ...prev };
            delete updated[studentToDelete._id];
            return updated;
        });

        setDeleteModal(false);
        setStudentToDelete(null);

        fetchStudents();
    }

    function markAttendance(id, status) {
        setAttendance((prev) => ({
            ...prev,
            [id]: status,
        }));
    }

    function clearAttendance(id) {
        setAttendance((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    }

    async function saveAttendance() {
        const records = students.map((s) => ({
            studentId: s._id,
            name: s.name,
            status: attendance[s._id] || "A",
        }));

        await API.post("/attendance", {
            date: today,
            records,
        });

        await fetchAttendance();

        // clear all selected attendance
        setAttendance({});

        alert("Attendance Saved ✓");
    }

    async function viewStudent(student) {
        const res = await API.get(
            `/attendance/student/${student._id}`
        );

        setSelectedStudent(student);
        setStats(res.data);
        setOpenModal(true);
    }

    const filteredStudents = students.filter((s) =>
        s.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const presentCount = filteredStudents.filter(
        (s) => attendance[s._id] === "P"
    ).length;

    const absentCount = filteredStudents.filter(
        (s) => attendance[s._id] === "A"
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-slate-100 pb-28">
            <div className="sticky top-0 z-30 bg-white shadow-sm px-4 py-4">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-center">
                        AttendDance
                    </h1>

                    <p className="text-center text-gray-500 text-sm mt-1">
                        {today}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {["attendance", "calendar", "fees"].map(
                            (item) => (
                                <button
                                    key={item}
                                    onClick={() => setTab(item)}
                                    className={`py-2 rounded-2xl font-semibold capitalize ${
                                        tab === item
                                            ? "bg-black text-white"
                                            : "bg-gray-100"
                                    }`}
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="max-w-md mx-auto">
                    {tab === "attendance" && (
                        <>
                            <div className="bg-white rounded-3xl p-4 shadow-lg mb-4 flex gap-2">
                                <input
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Student name"
                                    className="flex-1 border rounded-2xl px-4 py-3 outline-none"
                                />

                                {editing ? (
                                    <button
                                        onClick={updateStudent}
                                        className="bg-blue-600 text-white px-5 rounded-2xl"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={addStudent}
                                        className="bg-green-600 text-white px-5 rounded-2xl"
                                    >
                                        <FaPlus />
                                    </button>
                                )}
                            </div>

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search..."
                                className="w-full mb-4 bg-white rounded-2xl px-4 py-3 shadow outline-none"
                            />

                            <div className="space-y-4">
                                {filteredStudents.map(
                                    (student) => (
                                        <div
                                            key={student._id}
                                            className="bg-white rounded-3xl p-4 shadow-lg"
                                        >
                                            <div className="flex justify-between mb-3">
                                                <h3 className="font-bold text-lg">
                                                    {student.name}
                                                </h3>

                                                <button
                                                    onClick={() =>
                                                        viewStudent(student)
                                                    }
                                                    className="bg-purple-100 p-2 rounded-xl"
                                                >
                                                    <FaEye />
                                                </button>
                                            </div>

                                            <div className="flex gap-2 mb-2">
                                                <button
                                                    onClick={() =>
                                                        markAttendance(
                                                            student._id,
                                                            "P"
                                                        )
                                                    }
                                                    className={`flex-1 py-2 rounded-2xl font-medium transition-all ${
                                                        attendance[
                                                            student._id
                                                            ] === "P"
                                                            ? "bg-green-600 text-white shadow-lg scale-[1.02]"
                                                            : "bg-green-100 text-green-700"
                                                    }`}
                                                >
                                                    Present
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        markAttendance(
                                                            student._id,
                                                            "A"
                                                        )
                                                    }
                                                    className={`flex-1 py-2 rounded-2xl font-medium transition-all ${
                                                        attendance[
                                                            student._id
                                                            ] === "A"
                                                            ? "bg-red-600 text-white shadow-lg scale-[1.02]"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    Absent
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        clearAttendance(
                                                            student._id
                                                        )
                                                    }
                                                    className={`px-4 rounded-2xl font-medium transition-all ${
                                                        attendance[
                                                            student._id
                                                            ]
                                                            ? "bg-gray-700 text-white"
                                                            : "bg-gray-200 text-gray-700"
                                                    }`}
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditing(
                                                            student._id
                                                        );
                                                        setName(
                                                            student.name
                                                        );
                                                    }}
                                                    className="flex-1 bg-blue-100 py-2 rounded-2xl"
                                                >
                                                    <FaEdit className="mx-auto" />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        askDelete(student)
                                                    }
                                                    className="flex-1 bg-red-100 py-2 rounded-2xl"
                                                >
                                                    <FaTrash className="mx-auto" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}

                    {tab === "calendar" && (
                        <CalendarView
                            attendanceData={attendanceData}
                            setAttendanceData={setAttendanceData}
                        />
                    )}

                    {tab === "fees" && (
                        <FeesView
                            students={students}
                            setStudents={setStudents}
                        />
                    )}
                </div>
            </div>

            {tab === "attendance" && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl p-4">
                    <div className="max-w-md mx-auto flex justify-between items-center">
                        <b className="text-green-600">
                            Present: {presentCount}
                        </b>

                        <b className="text-red-600">
                            Absent: {absentCount}
                        </b>

                        <button
                            onClick={saveAttendance}
                            className="bg-black text-white px-5 py-2 rounded-2xl"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <StudentModal
                open={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
                student={selectedStudent}
                stats={stats}
            />

            <DeleteModal
                open={deleteModal}
                student={studentToDelete}
                onClose={() =>
                    setDeleteModal(false)
                }
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default Home;