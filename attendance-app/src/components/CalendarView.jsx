import { useMemo, useState } from "react";
import API from "../api";

function CalendarView({
                          attendanceData,
                          setAttendanceData,
                          students,
                      }) {
    const [selectedDay, setSelectedDay] =
        useState(null);

    const [editRecords, setEditRecords] =
        useState([]);

    const [newDate, setNewDate] =
        useState("");

    const days = useMemo(() => {
        const map = {};

        attendanceData.forEach((day) => {
            const present = day.records.filter(
                (r) => r.status === "P"
            ).length;

            const total = day.records.length;

            const dateNum = new Date(
                day.date
            ).getDate();

            map[dateNum] = {
                present,
                total,
                records: day.records,
                fullDate: day.date,
            };
        });

        return map;
    }, [attendanceData]);

    function openDay(data) {
        setSelectedDay(data);
        setEditRecords(data.records);
    }

    function toggleStatus(studentId) {
        setEditRecords((prev) =>
            prev.map((r) =>
                r.studentId === studentId
                    ? {
                        ...r,
                        status:
                            r.status === "P"
                                ? "A"
                                : "P",
                    }
                    : r
            )
        );
    }

    async function updateAttendance() {
        await API.put(
            `/attendance/${encodeURIComponent(
                selectedDay.fullDate
            )}`,
            {
                records: editRecords,
            }
        );

        setAttendanceData((prev) =>
            prev.map((d) =>
                d.date === selectedDay.fullDate
                    ? {
                        ...d,
                        records: editRecords,
                    }
                    : d
            )
        );

        setSelectedDay(null);
    }

    async function deleteAttendance() {
        await API.delete(
            `/attendance/${encodeURIComponent(
                selectedDay.fullDate
            )}`
        );

        setAttendanceData((prev) =>
            prev.filter(
                (d) =>
                    d.date !==
                    selectedDay.fullDate
            )
        );

        setSelectedDay(null);
    }

    async function addMissedAttendance() {
        if (!newDate) return;

        const formatted =
            new Date(newDate).toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            );

        const records = students.map((s) => ({
            studentId: s._id,
            name: s.name,
            status: "A",
        }));

        const res = await API.put(
            `/attendance/${encodeURIComponent(
                formatted
            )}`,
            {
                records,
            }
        );

        setAttendanceData((prev) => [
            res.data,
            ...prev,
        ]);

        setNewDate("");
    }

    const monthDays = Array.from(
        { length: 31 },
        (_, i) => i + 1
    );

    return (
        <>
            <div className="bg-white rounded-3xl p-4 shadow-lg mb-4">
                <h2 className="font-bold mb-3">
                    Add Missed Attendance
                </h2>

                <div className="flex gap-2">
                    <input
                        type="date"
                        value={newDate}
                        onChange={(e) =>
                            setNewDate(e.target.value)
                        }
                        className="flex-1 border rounded-2xl px-4 py-2"
                    />

                    <button
                        onClick={addMissedAttendance}
                        className="bg-black text-white px-4 rounded-2xl"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    Calendar
                </h2>

                <div className="grid grid-cols-7 gap-2">
                    {monthDays.map((day) => {
                        const data = days[day];

                        return (
                            <button
                                key={day}
                                onClick={() =>
                                    data && openDay(data)
                                }
                                className={`rounded-2xl p-2 min-h-[75px] ${
                                    data
                                        ? "bg-blue-100"
                                        : "bg-gray-100 text-gray-400"
                                }`}
                            >
                                <div className="font-bold">
                                    {day}
                                </div>

                                {data && (
                                    <div className="text-xs mt-2">
                                        {data.present}/
                                        {data.total}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {selectedDay && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
                    <div className="bg-white w-full rounded-t-3xl p-5 max-h-[80vh] overflow-auto">
                        <h2 className="font-bold text-xl mb-4">
                            {selectedDay.fullDate}
                        </h2>

                        <div className="space-y-2 mb-6">
                            {editRecords.map((r) => (
                                <button
                                    key={r.studentId}
                                    onClick={() =>
                                        toggleStatus(
                                            r.studentId
                                        )
                                    }
                                    className={`w-full p-3 rounded-2xl text-left ${
                                        r.status === "P"
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                                >
                                    {r.name} — {r.status}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <button
                                onClick={updateAttendance}
                                className="py-3 rounded-2xl bg-blue-600 text-white"
                            >
                                Update
                            </button>

                            <button
                                onClick={deleteAttendance}
                                className="py-3 rounded-2xl bg-red-600 text-white"
                            >
                                Delete
                            </button>
                        </div>

                        <button
                            onClick={() =>
                                setSelectedDay(null)
                            }
                            className="w-full py-3 rounded-2xl bg-gray-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CalendarView;