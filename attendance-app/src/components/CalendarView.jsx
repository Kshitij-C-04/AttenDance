import { useMemo, useState } from "react";
import API from "../api";

function CalendarView({
                          attendanceData,
                          setAttendanceData,
                      }) {
    const [selectedDay, setSelectedDay] =
        useState(null);

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

    const monthDays = Array.from(
        { length: 31 },
        (_, i) => i + 1
    );

    return (
        <>
            <div className="bg-white rounded-3xl p-4 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    May 2026
                </h2>

                <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-3">
                    {[
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                    ].map((d) => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {monthDays.map((day) => {
                        const data = days[day];

                        return (
                            <button
                                key={day}
                                onClick={() =>
                                    data &&
                                    setSelectedDay(data)
                                }
                                className={`rounded-2xl p-2 min-h-[75px] flex flex-col justify-between ${
                                    data
                                        ? "bg-blue-100 hover:bg-blue-200"
                                        : "bg-gray-100 text-gray-400"
                                }`}
                            >
                <span className="font-bold text-left">
                  {day}
                </span>

                                {data && (
                                    <span className="text-xs font-semibold">
                    {data.present}/
                                        {data.total}
                  </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {selectedDay && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
                    <div className="bg-white w-full rounded-t-3xl p-5 max-h-[80vh] overflow-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-bold">
                                {selectedDay.fullDate}
                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedDay(null)
                                }
                            >
                                ✕
                            </button>
                        </div>

                        <h3 className="text-green-600 font-bold mb-2">
                            Present (
                            {
                                selectedDay.records.filter(
                                    (r) =>
                                        r.status === "P"
                                ).length
                            }
                            )
                        </h3>

                        <div className="space-y-2 mb-5">
                            {selectedDay.records
                                .filter(
                                    (r) =>
                                        r.status === "P"
                                )
                                .map((r) => (
                                    <div
                                        key={r.studentId}
                                        className="bg-green-50 p-3 rounded-2xl"
                                    >
                                        ✓ {r.name}
                                    </div>
                                ))}
                        </div>

                        <h3 className="text-red-600 font-bold mb-2">
                            Absent (
                            {
                                selectedDay.records.filter(
                                    (r) =>
                                        r.status === "A"
                                ).length
                            }
                            )
                        </h3>

                        <div className="space-y-2 mb-6">
                            {selectedDay.records
                                .filter(
                                    (r) =>
                                        r.status === "A"
                                )
                                .map((r) => (
                                    <div
                                        key={r.studentId}
                                        className="bg-red-50 p-3 rounded-2xl"
                                    >
                                        ✗ {r.name}
                                    </div>
                                ))}
                        </div>

                        <button
                            onClick={
                                deleteAttendance
                            }
                            className="w-full py-3 rounded-2xl bg-red-600 text-white font-semibold"
                        >
                            Delete Attendance
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CalendarView;