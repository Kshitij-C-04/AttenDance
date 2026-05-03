function StudentModal({
                          open,
                          onClose,
                          student,
                          stats,
                      }) {
    if (!open || !student) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-3xl p-5 max-h-[80vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {student.name}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-green-100 rounded-2xl p-3 text-center">
                        <p className="text-sm">Present</p>
                        <p className="font-bold text-xl">
                            {stats.present}
                        </p>
                    </div>

                    <div className="bg-red-100 rounded-2xl p-3 text-center">
                        <p className="text-sm">Absent</p>
                        <p className="font-bold text-xl">
                            {stats.absent}
                        </p>
                    </div>

                    <div className="bg-blue-100 rounded-2xl p-3 text-center">
                        <p className="text-sm">%</p>
                        <p className="font-bold text-xl">
                            {stats.percentage}%
                        </p>
                    </div>
                </div>

                <h3 className="font-semibold mb-3">
                    Attendance Calendar
                </h3>

                <div className="grid grid-cols-5 gap-2">
                    {stats.history?.map((item) => (
                        <div
                            key={item.date}
                            className={`rounded-2xl p-3 text-center text-white ${
                                item.status === "P"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }`}
                        >
                            <div className="text-sm">
                                {new Date(
                                    item.date
                                ).getDate()}
                            </div>
                            <div className="text-xs mt-1">
                                {item.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StudentModal;